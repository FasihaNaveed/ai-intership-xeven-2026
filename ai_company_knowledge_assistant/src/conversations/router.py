from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db

from src.conversations.schemas import (
    ConversationCreate,
    ConversationUpdate,
    ConversationResponse,
    ConversationsListingResponse
)

from src.conversations.services import ConversationService


router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"]
)


@router.post(
    "/",
    response_model=ConversationResponse
)
async def create_conversation(
    payload: ConversationCreate,
    db: AsyncSession = Depends(get_db)
):
    return await ConversationService.create_conversation(
        payload,
        db
    )


@router.get(
    "/",
    response_model=ConversationsListingResponse
)
async def get_conversations(
    page_no: int = 1,
    page_size: int = 10,
    user_id: Optional[int] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    return await ConversationService.get_conversations(
        db=db,
        page_no=page_no,
        page_size=page_size,
        user_id=user_id
    )


@router.get(
    "/{conversation_id}",
    response_model=ConversationResponse
)
async def get_conversation(
    conversation_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await ConversationService.get_conversation(
        conversation_id,
        db
    )


@router.put(
    "/{conversation_id}",
    response_model=ConversationResponse
)
async def update_conversation(
    conversation_id: int,
    payload: ConversationUpdate,
    db: AsyncSession = Depends(get_db)
):
    return await ConversationService.update_conversation(
        conversation_id,
        payload,
        db
    )


@router.delete(
    "/{conversation_id}"
)
async def delete_conversation(
    conversation_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await ConversationService.delete_conversation(
        conversation_id,
        db
    )