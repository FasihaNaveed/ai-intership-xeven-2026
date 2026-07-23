from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db
from src.notifications.schemas import NotificationResponse, NotificationCreate
from src.notifications.services import NotificationService

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get(
    "/",
    response_model=list[NotificationResponse]
)
async def get_notifications(
    user_id: int = Query(None, description="Filter by user ID"),
    unread_only: bool = Query(False, description="Show only unread"),
    db: AsyncSession = Depends(get_db)
):
    return await NotificationService.get_notifications(
        db,
        user_id=user_id,
        unread_only=unread_only
    )


@router.post(
    "/",
    response_model=NotificationResponse,
    status_code=201
)
async def create_notification(
    payload: NotificationCreate,
    db: AsyncSession = Depends(get_db)
):
    return await NotificationService.create_notification(
        payload,
        db
    )


@router.patch(
    "/{notification_id}/read",
    response_model=NotificationResponse
)
async def mark_as_read(
    notification_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await NotificationService.mark_as_read(
        notification_id,
        db
    )
    if not result:
        from fastapi import HTTPException, status
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    return result


@router.post("/mark-all-read")
async def mark_all_as_read(
    user_id: int = Query(None),
    db: AsyncSession = Depends(get_db)
):
    return await NotificationService.mark_all_as_read(
        db,
        user_id=user_id
    )


@router.get("/unread-count")
async def get_unread_count(
    user_id: int = Query(None),
    db: AsyncSession = Depends(get_db)
):
    count = await NotificationService.get_unread_count(
        db,
        user_id=user_id
    )
    return {"unread_count": count}


@router.delete(
    "/{notification_id}"
)
async def delete_notification(
    notification_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await NotificationService.delete_notification(
        notification_id,
        db
    )
    if not result:
        from fastapi import HTTPException, status
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    return result

