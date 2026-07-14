from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from fastapi import HTTPException, status

from src.chat.models import ChatMessage
from src.chat.schemas import (
    ChatRequest,
    ChatResponse,
    ChatListingResponse
)

from src.rag.pipeline import RAGPipeline
from src.users.models import User


class ChatService:

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
        # Save Chat History
        # ==========================
        chat = ChatMessage(
            user_id=payload.user_id,
            question=payload.question,
            answer=answer,
            sources=sources
        )

        db.add(chat)

        await db.commit()

        await db.refresh(chat)

        return ChatResponse(
            answer=answer,
            sources=result["sources"]
        )

    @staticmethod
    async def get_chat_history(
        user_id: int,
        db: AsyncSession,
        page_no: int = 1,
        page_size: int = 10
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
        # Total Records of User
        # ==========================
        total_records_query = await db.execute(
            select(func.count())
            .select_from(ChatMessage)
            .where(
                ChatMessage.user_id == user_id
            )
        )

        total_records = (
            total_records_query.scalar()
        )

        offset = (
            page_no - 1
        ) * page_size

        # ==========================
        # User Specific Chats
        # ==========================
        result = await db.execute(
            select(ChatMessage)
            .where(
                ChatMessage.user_id == user_id
            )
            .offset(offset)
            .limit(page_size)
            .order_by(
                ChatMessage.created_at.desc()
            )
        )

        chats = result.scalars().all()

        total_pages = (
            total_records + page_size - 1
        ) // page_size

        return ChatListingResponse(
            total_records=total_records,
            total_pages=total_pages,
            current_page=page_no,
            page_size=page_size,
            data=chats
        )

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