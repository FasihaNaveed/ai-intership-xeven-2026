from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db

from src.chat.schemas import (
    ChatRequest,
    ChatResponse,
    ChatListingResponse
)

from src.chat.services import ChatService


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "/ask",
    response_model=ChatResponse
)
async def ask_question(
    payload: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    return await ChatService.ask_question(
        payload,
        db
    )


@router.get(
    "/history",
    response_model=ChatListingResponse
)
async def get_chat_history(
    user_id: int,
    page_no: int = 1,
    page_size: int = 10,
    db: AsyncSession = Depends(get_db)
):
    return await ChatService.get_chat_history(
        user_id=user_id,
        db=db,
        page_no=page_no,
        page_size=page_size
    )


@router.delete(
    "/{chat_id}"
)
async def delete_chat(
    chat_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await ChatService.delete_chat(
        chat_id,
        db
    )