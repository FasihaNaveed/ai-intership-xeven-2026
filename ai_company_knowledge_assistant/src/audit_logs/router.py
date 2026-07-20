from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db

from src.audit_logs.schemas import AuditLogResponse
from src.audit_logs.services import AuditLogService


router = APIRouter(
    prefix="/audit-logs",
    tags=["Audit Logs"]
)


@router.get(
    "/",
    response_model=list[AuditLogResponse]
)
async def get_audit_logs(
    db: AsyncSession = Depends(get_db)
):
    return await AuditLogService.get_logs(
        db
    )


@router.get("/health")
async def health():
    return {
        "message": "Audit Logs module working"
    }