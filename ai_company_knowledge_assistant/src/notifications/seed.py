from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from src.notifications.models import Notification


async def seed_default_notifications(db: AsyncSession):
    """Seed default system notifications if the notifications table is empty."""

    result = await db.execute(select(func.count()).select_from(Notification))
    count = result.scalar()

    if count and count > 0:
        return  # Already have notifications

    defaults = [
        Notification(
            type="info",
            message="Welcome to AI Company Knowledge Assistant. Explore the dashboard to get started.",
            is_read=False,
        ),
        Notification(
            type="success",
            message="System is online. All services are running normally.",
            is_read=False,
        ),
        Notification(
            type="info",
            message="Documents can be uploaded and indexed from the Documents page.",
            is_read=False,
        ),
        Notification(
            type="alert",
            message="Tip: Use the AI Assistant to query your company knowledge base.",
            is_read=False,
        ),
        Notification(
            type="success",
            message="Knowledge base initialized. Ready to accept document uploads.",
            is_read=False,
        ),
    ]

    for notif in defaults:
        db.add(notif)

    await db.commit()

