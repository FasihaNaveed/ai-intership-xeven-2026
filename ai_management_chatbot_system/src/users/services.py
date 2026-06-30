from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from src.users.models import User
from src.users.schemas import (
    UserCreate,
    UserResponse,
    AssignSubject
)
from src.users.utils import (
    get_user_by_email,
    get_user_by_id,
    get_all_users,
    update_user,
    delete_user,
)

from src.subjects.utils import get_subject_by_id

from src.instructors.utils import get_instructor_by_id

def create_user_service(db: Session, user: UserCreate):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists."
        )

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def get_users_service(db: Session):
    return get_all_users(db)


def get_single_user_service(db: Session, user_id: int):

    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    return user

def update_user_service(db: Session, user_id: int, user_data: UserCreate):

    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    user.first_name = user_data.first_name
    user.last_name = user_data.last_name
    user.email = user_data.email
    user.password = user_data.password

    db.commit()
    db.refresh(user)

    return user


def delete_user_service(db: Session, user_id: int):

    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    delete_user(db, user)

    return {
        "message": "User deleted successfully."
    }

def assign_subject_service(
    db: Session,
    user_id: int,
    subject_id: int
):

    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    subject = get_subject_by_id(
        db,
        subject_id
    )

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found."
        )

    if subject not in user.subjects:
        user.subjects.append(subject)

    db.commit()
    db.refresh(user)

    return {
        "message": "Subject assigned successfully."
    }

def assign_instructor_service(
    db: Session,
    user_id: int,
    instructor_id: int
):

    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    instructor = get_instructor_by_id(
        db,
        instructor_id
    )

    if not instructor:
        raise HTTPException(
            status_code=404,
            detail="Instructor not found."
        )

    if instructor not in user.instructors:
        user.instructors.append(instructor)

    db.commit()
    db.refresh(user)

    return {
        "message": "Instructor assigned successfully."
    }