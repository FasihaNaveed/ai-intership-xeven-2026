from pydantic import BaseModel
from typing import Optional


class DashboardStatsResponse(BaseModel):
    total_documents: int
    total_users: int
    total_chats: int
    total_conversations: int

    documents_uploaded_today: int
    questions_today: int

    latest_document: Optional[str] = None
    latest_question: Optional[str] = None