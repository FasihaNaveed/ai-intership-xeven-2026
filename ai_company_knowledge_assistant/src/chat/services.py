from datetime import date

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from fastapi import HTTPException, status

from src.chat.models import ChatMessage
from src.chat.schemas import (
    ChatRequest,
    ChatResponse,
    ChatListingResponse,
    ChatHistoryResponse
)

from src.rag.pipeline import RAGPipeline
from src.users.models import User

from src.conversations.models import Conversation

from src.notifications.services import (
    NotificationService
)

from src.notifications.schemas import (
    NotificationCreate
)


class ChatService:

    @staticmethod
    async def _get_or_create_conversation_for_question(
        user_id: int,
        question: str,
        db: AsyncSession,
        conversation_id: Optional[int] = None
    ):
        """Reuse existing conversation if conversation_id provided, otherwise create new.
        ChatGPT-style: follow-up messages stay in the same conversation session."""
        if conversation_id:
            # Fetch existing conversation session
            result = await db.execute(
                select(Conversation).where(
                    Conversation.id == conversation_id,
                    Conversation.user_id == user_id
                )
            )
            conversation = result.scalar_one_or_none()
            if conversation:
                # Update title with latest question context (first line of conversation)
                # Only update title if current title is very short (first message)
                if len(conversation.title) < 10:
                    conversation.title = question[:60] + ("..." if len(question) > 60 else "")
                return conversation.id

        # Create a BRAND NEW conversation session using the first query as title
        title = question[:60] + ("..." if len(question) > 60 else "")
        new_conv = Conversation(
            user_id=user_id,
            title=title
        )
        db.add(new_conv)
        await db.flush()
        await db.refresh(new_conv)
        return new_conv.id

    @staticmethod
    async def ask_question(
        payload: ChatRequest,
        db: AsyncSession
    ):

        # ==========================
        # Check User Exists
        # ==========================
        user_result = await db.execute(
            select(User).where(
                User.id == payload.user_id
            )
        )

        user = user_result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id {payload.user_id} does not exist"
            )

        # ==========================
        # Run RAG Pipeline
        # ==========================
        rag_pipeline = RAGPipeline()

        result = rag_pipeline.run(
            payload.question
        )

        answer = result["answer"]

        sources = (
            ", ".join(result["sources"])
            if result["sources"]
            else "No sources found"
        )

        print("\n")
        print("=" * 50)
        print("QUESTION:", payload.question)
        print("RETRIEVED DOCUMENTS:", result["sources"])
        print("=" * 50)
        print("\n")

        # ==========================
        # Get or Create Conversation Session
        # ==========================
        conversation_id = await ChatService._get_or_create_conversation_for_question(
            payload.user_id, payload.question, db, payload.conversation_id
        )

        # ==========================
        # Save Chat History
        # ==========================
        chat = ChatMessage(
            user_id=payload.user_id,
            conversation_id=conversation_id,
            question=payload.question,
            answer=answer,
            sources=sources
        )

        db.add(chat)

        await db.commit()

        await db.refresh(chat)

        # ==========================
        # Create Notification
        # ==========================
        await NotificationService.create_notification(
            NotificationCreate(
                type="info",
                message=f"New question from {user.full_name or 'User'}: {payload.question[:80]}{'...' if len(payload.question) > 80 else ''}"
            ),
            db
        )

        return ChatResponse(
            answer=answer,
            sources=result["sources"],
            conversation_id=conversation_id
        )

    @staticmethod
    async def get_chat_history(
        user_id: int,
        db: AsyncSession,
        page_no: int = 1,
        page_size: int = 10,
        conversation_id: int = None
    ):

        # ==========================
        # Check User Exists
        # ==========================
        user_result = await db.execute(
            select(User).where(
                User.id == user_id
            )
        )

        user = user_result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id {user_id} does not exist"
            )

        # ==========================
        # Build Query
        # ==========================
        count_query = select(func.count()).select_from(ChatMessage).where(
            ChatMessage.user_id == user_id
        )
        data_query = select(ChatMessage).where(
            ChatMessage.user_id == user_id
        )

        if conversation_id:
            count_query = count_query.where(
                ChatMessage.conversation_id == conversation_id
            )
            data_query = data_query.where(
                ChatMessage.conversation_id == conversation_id
            )

        # ==========================
        # Total Records
        # ==========================
        total_records_result = await db.execute(count_query)
        total_records = total_records_result.scalar()

        offset = (
            page_no - 1
        ) * page_size

        # ==========================
        # Fetch Records
        # ==========================
        result = await db.execute(
            data_query
            .offset(offset)
            .limit(page_size)
            .order_by(
                ChatMessage.created_at.desc()
            )
        )

        chats = result.scalars().all()

        total_pages = (
            total_records + page_size - 1
        ) // page_size if total_records else 1

        return ChatListingResponse(
            total_records=total_records,
            total_pages=total_pages,
            current_page=page_no,
            page_size=page_size,
            data=chats
        )

    @staticmethod
    async def get_chat_messages_by_conversation(
        conversation_id: int,
        db: AsyncSession
    ):
        """Get all chat messages for a specific conversation, ordered chronologically."""
        result = await db.execute(
            select(ChatMessage)
            .where(
                ChatMessage.conversation_id == conversation_id
            )
            .order_by(ChatMessage.created_at.asc())
        )
        return result.scalars().all()

    @staticmethod
    async def delete_chat(
        chat_id: int,
        db: AsyncSession
    ):

        result = await db.execute(
            select(ChatMessage).where(
                ChatMessage.id == chat_id
            )
        )

        chat = result.scalar_one_or_none()

        if not chat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found"
            )

        await db.delete(chat)

        await db.commit()

        return {
            "message": "Chat deleted successfully"
        }

