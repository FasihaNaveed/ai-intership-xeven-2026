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


class ChatService:

    @staticmethod
    async def ask_question(
        payload: ChatRequest,
        db: AsyncSession
    ):

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
        db: AsyncSession,
        page_no: int = 1,
        page_size: int = 10
    ):

        total_records = await db.execute(
            select(func.count()).select_from(
                ChatMessage
            )
        )

        total_records = total_records.scalar()

        offset = (page_no - 1) * page_size

        result = await db.execute(
            select(ChatMessage)
            .offset(offset)
            .limit(page_size)
            .order_by(ChatMessage.created_at.desc())
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