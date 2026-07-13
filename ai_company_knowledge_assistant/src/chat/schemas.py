from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ChatRequest(BaseModel):
    question: str
    user_id: int


class ChatResponse(BaseModel):
    answer: str
    sources: list[str]


class ChatHistoryResponse(BaseModel):
    id: int
    user_id: int
    question: str
    answer: str
    sources: Optional[str] = None
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class ChatListingResponse(BaseModel):
    total_records: int
    total_pages: int
    current_page: int
    page_size: int
    data: list[ChatHistoryResponse]