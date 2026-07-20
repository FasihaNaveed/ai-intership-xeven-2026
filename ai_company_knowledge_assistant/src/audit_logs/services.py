from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.audit_logs.models import AuditLog


class AuditLogService:

    @staticmethod
    async def create_log(
        user_id: int | None,
        user_name: str,
        action: str,
        resource: str,
        db: AsyncSession
    ):

        log = AuditLog(
            user_id=user_id,
            user_name=user_name,
            action=action,
            resource=resource
        )

        db.add(log)

        await db.commit()

        await db.refresh(log)

        return log

    @staticmethod
    async def get_logs(
        db: AsyncSession
    ):

        query = (
            select(AuditLog)
            .order_by(AuditLog.created_at.desc())
        )

        result = await db.execute(query)

        return result.scalars().all()