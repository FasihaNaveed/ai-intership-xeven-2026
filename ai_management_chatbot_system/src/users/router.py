from fastapi import APIRouter, Depends
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
    return await UserService.create_user(db, user)


@router.get("/")
async def get_users(
    db: Session = Depends(get_db)
):
    return await UserService.get_users(db)


@router.get("/{user_id}")
async def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return await UserService.get_user(db, user_id)


@router.put("/{user_id}")
async def update_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return await UserService.update_user(db, user_id, user)


@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return await UserService.delete_user(db, user_id)


@router.post("/{user_id}/assign-subject")
async def assign_subject(
    user_id: int,
    data: AssignSubject,
    db: Session = Depends(get_db)
):
    return await UserService.assign_subject(
        db,
        user_id,
        data.subject_id
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
        data.instructor_id
    )