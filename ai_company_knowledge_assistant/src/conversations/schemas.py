from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ConversationCreate(BaseModel):
    user_id: int
    title: str


class ConversationUpdate(BaseModel):
    title: Optional[str] = None


class ConversationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }


class ConversationsListingResponse(BaseModel):
    total_records: int
    total_pages: int
    current_page: int
    page_size: int
    data: list[ConversationResponse]