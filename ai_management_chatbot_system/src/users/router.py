from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.database import get_db
from src.users.schemas import (
    UserCreate,
    AssignSubject,
    AssignInstructor,
)
from src.users.services import UserService


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/")
async def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return await UserService.create_user(
        db,
        user,
    )


@router.get("/")
async def get_users(
    enable_pagination: bool = Query(
        default=False,
        description="Enable or disable pagination"
    ),
    page_size: int = Query(
        default=12,
        ge=1,
        description="Number of records per page"
    ),
    page_no: int = Query(
        default=1,
        ge=1,
        description="Current page number"
    ),
    search: str = Query(
        default="",
        description="Search by first name, last name or email"
    ),
    db: Session = Depends(get_db)
):
    return await UserService.get_users(
        db=db,
        enable_pagination=enable_pagination,
        page_size=page_size,
        page_no=page_no,
        search=search,
    )


@router.get("/{user_id}")
async def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return await UserService.get_user(
        db,
        user_id,
    )


@router.put("/{user_id}")
async def update_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return await UserService.update_user(
        db,
        user_id,
        user,
    )


@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return await UserService.delete_user(
        db,
        user_id,
    )


@router.post("/{user_id}/assign-subject")
async def assign_subject(
    user_id: int,
    data: AssignSubject,
    db: Session = Depends(get_db)
):
    return await UserService.assign_subject(
        db,
        user_id,
        data.subject_id,
    )


@router.post("/{user_id}/assign-instructor")
async def assign_instructor(
    user_id: int,
    data: AssignInstructor,
    db: Session = Depends(get_db)
):
    return await UserService.assign_instructor(
        db,
        user_id,
        data.instructor_id,
    )