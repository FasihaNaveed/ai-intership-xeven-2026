from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from src.notifications.models import Notification
from src.notifications.schemas import NotificationCreate
from src.notifications.seed import seed_default_notifications


class NotificationService:

    @staticmethod
    async def get_notifications(
        db: AsyncSession,
        user_id: int = None,
        unread_only: bool = False
    ):
        # Seed default notifications on first fetch if empty
        await seed_default_notifications(db)

        query = select(Notification).order_by(
            Notification.created_at.desc()
        )

        if user_id:
            query = query.where(
                Notification.user_id == user_id
            )

        if unread_only:
            query = query.where(
                Notification.is_read == False
            )

        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def create_notification(
        payload: NotificationCreate,
        db: AsyncSession
    ):
        notification = Notification(
            user_id=payload.user_id,
            type=payload.type,
            message=payload.message,
            is_read=False
        )

        db.add(notification)
        await db.commit()
        await db.refresh(notification)
        return notification

    @staticmethod
    async def mark_as_read(
        notification_id: int,
        db: AsyncSession
    ):
        query = select(Notification).where(
            Notification.id == notification_id
        )
        result = await db.execute(query)
        notification = result.scalar_one_or_none()

        if not notification:
            return None

        notification.is_read = True
        await db.commit()
        await db.refresh(notification)
        return notification

    @staticmethod
    async def mark_all_as_read(
        db: AsyncSession,
        user_id: int = None
    ):
        query = select(Notification).where(
            Notification.is_read == False
        )

        if user_id:
            query = query.where(
                Notification.user_id == user_id
            )

        result = await db.execute(query)
        notifications = result.scalars().all()

        for notification in notifications:
            notification.is_read = True

        await db.commit()
        return {"message": "All notifications marked as read"}

    @staticmethod
    async def delete_notification(
        notification_id: int,
        db: AsyncSession
    ):
        query = select(Notification).where(
            Notification.id == notification_id
        )
        result = await db.execute(query)
        notification = result.scalar_one_or_none()

        if not notification:
            return None

        await db.delete(notification)
        await db.commit()
        return {"message": "Notification deleted successfully"}

    @staticmethod
    async def get_unread_count(
        db: AsyncSession,
        user_id: int = None
    ):
        query = select(func.count()).select_from(
            Notification
        ).where(
            Notification.is_read == False
        )

        if user_id:
            query = query.where(
                Notification.user_id == user_id
            )

        result = await db.execute(query)
        return result.scalar()

