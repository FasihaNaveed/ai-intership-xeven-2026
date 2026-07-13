from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from fastapi import HTTPException, status

from src.conversations.models import Conversation
from src.conversations.schemas import (
    ConversationCreate,
    ConversationUpdate,
    ConversationsListingResponse
)


class ConversationService:

    @staticmethod
    async def create_conversation(
        payload: ConversationCreate,
        db: AsyncSession
    ):

        conversation = Conversation(
            user_id=payload.user_id,
            title=payload.title
        )

        db.add(conversation)

        await db.commit()

        await db.refresh(conversation)

        return conversation

    @staticmethod
    async def get_conversations(
        db: AsyncSession,
        page_no: int = 1,
        page_size: int = 10
    ):

        total_records = await db.execute(
            select(func.count()).select_from(
                Conversation
            )
        )

        total_records = total_records.scalar()

        offset = (page_no - 1) * page_size

        result = await db.execute(
            select(Conversation)
            .offset(offset)
            .limit(page_size)
            .order_by(
                Conversation.created_at.desc()
            )
        )

        conversations = result.scalars().all()

        total_pages = (
            total_records + page_size - 1
        ) // page_size

        return ConversationsListingResponse(
            total_records=total_records,
            total_pages=total_pages,
            current_page=page_no,
            page_size=page_size,
            data=conversations
        )

    @staticmethod
    async def get_conversation(
        conversation_id: int,
        db: AsyncSession
    ):

        result = await db.execute(
            select(Conversation).where(
                Conversation.id == conversation_id
            )
        )

        conversation = result.scalar_one_or_none()

        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Conversation not found"
            )

        return conversation

    @staticmethod
    async def update_conversation(
        conversation_id: int,
        payload: ConversationUpdate,
        db: AsyncSession
    ):

        conversation = await ConversationService.get_conversation(
            conversation_id,
            db
        )

        update_data = payload.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(
                conversation,
                key,
                value
            )

        await db.commit()

        await db.refresh(
            conversation
        )

        return conversation

    @staticmethod
    async def delete_conversation(
        conversation_id: int,
        db: AsyncSession
    ):

        conversation = await ConversationService.get_conversation(
            conversation_id,
            db
        )

        await db.delete(
            conversation
        )

        await db.commit()

        return {
            "message": "Conversation deleted successfully"
        }