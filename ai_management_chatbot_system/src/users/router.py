from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from src.database import get_db

from src.users.schemas import (
    UserCreate,
    UserResponse,
    AssignSubject,
    AssignInstructor,
)

from src.users.services import (
    create_user_service,
    get_users_service,
    get_single_user_service,
    update_user_service,
    delete_user_service,
    assign_subject_service,
    assign_instructor_service,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/", response_model=UserResponse)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user_service(db, user)


@router.get("/", response_model=List[UserResponse])
def get_users(
    db: Session = Depends(get_db)
):
    return get_users_service(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_single_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_single_user_service(db, user_id)


@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return update_user_service(db, user_id, user)


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return delete_user_service(db, user_id)

@router.post("/{user_id}/assign-subject")
def assign_subject(
    user_id: int,
    data: AssignSubject,
    db: Session = Depends(get_db)
):
    return assign_subject_service(
        db,
        user_id,
        data.subject_id
    )

@router.post("/{user_id}/assign-instructor")
def assign_instructor(
    user_id: int,
    data: AssignInstructor,
    db: Session = Depends(get_db)
):
    return assign_instructor_service(
        db,
        user_id,
        data.instructor_id
    )