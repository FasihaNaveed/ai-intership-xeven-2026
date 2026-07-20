from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, date
from sqlalchemy import desc

from src.analytics.schemas import DashboardStatsResponse

from src.users.models import User
from src.chat.models import ChatMessage
from src.conversations.models import Conversation
from src.documents.models import Document


class AnalyticsService:

    @staticmethod
    async def get_dashboard_stats(
        db: AsyncSession
    ):

        # ==========================
        # Total Documents
        # ==========================
        documents_result = await db.execute(
            select(func.count())
            .select_from(Document)
        )

        total_documents = documents_result.scalar()

        # ==========================
        # Total Users
        # ==========================
        users_result = await db.execute(
            select(func.count())
            .select_from(User)
        )

        total_users = users_result.scalar()

        # ==========================
        # Total Chats
        # ==========================
        chats_result = await db.execute(
            select(func.count())
            .select_from(ChatMessage)
        )

        total_chats = chats_result.scalar()

        # ==========================
        # Total Conversations
        # ==========================
        conversations_result = await db.execute(
            select(func.count())
            .select_from(Conversation)
        )

        total_conversations = conversations_result.scalar()

        # ==========================
        # Documents Uploaded Today
        # ==========================
        today = date.today()

        documents_today_result = await db.execute(
            select(func.count())
            .select_from(Document)
            .where(
                func.date(Document.created_at) == today
            )
        )

        documents_uploaded_today = (
            documents_today_result.scalar()
        )

        # ==========================
        # Questions Asked Today
        # ==========================
        questions_today_result = await db.execute(
            select(func.count())
            .select_from(ChatMessage)
            .where(
                func.date(ChatMessage.created_at) == today
            )
        )

        questions_today = (
            questions_today_result.scalar()
        )

        # ==========================
        # Latest Uploaded Document
        # ==========================
        latest_document_result = await db.execute(
            select(Document)
            .order_by(desc(Document.created_at))
            .limit(1)
        )

        latest_document = latest_document_result.scalar_one_or_none()

        latest_document_name = (
            latest_document.document_name
            if latest_document
            else None
        )

        # ==========================
        # Latest Question
        # ==========================
        latest_question_result = await db.execute(
            select(ChatMessage)
            .order_by(desc(ChatMessage.created_at))
            .limit(1)
        )

        latest_question = latest_question_result.scalar_one_or_none()

        latest_question_text = (
            latest_question.question
            if latest_question
            else None
        )

        # ==========================
        # Return Dashboard Stats
        # ==========================
        return DashboardStatsResponse(
            total_documents=total_documents,
            total_users=total_users,
            total_chats=total_chats,
            total_conversations=total_conversations,
            documents_uploaded_today=documents_uploaded_today,
            questions_today=questions_today,
            latest_document=latest_document_name,
            latest_question=latest_question_text,
        )