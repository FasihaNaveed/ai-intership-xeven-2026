from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from src.instructors.models import Instructor
from src.instructors.schemas import InstructorCreate
from src.instructors.utils import (
    get_instructor_by_email,
    get_instructor_by_id,
    get_all_instructors,
    delete_instructor,
)

from src.subjects.utils import get_subject_by_id

def create_instructor_service(db: Session, instructor: InstructorCreate):

    existing = get_instructor_by_email(
        db,
        instructor.email
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Instructor already exists."
        )

    new_instructor = Instructor(
        first_name=instructor.first_name,
        last_name=instructor.last_name,
        email=instructor.email,
        specialization=instructor.specialization,
    )

    db.add(new_instructor)
    db.commit()
    db.refresh(new_instructor)

    return new_instructor


def get_instructors_service(db: Session):
    return get_all_instructors(db)


def get_single_instructor_service(
    db: Session,
    instructor_id: int,
):
    instructor = get_instructor_by_id(
        db,
        instructor_id
    )

    if not instructor:
        raise HTTPException(
            status_code=404,
            detail="Instructor not found."
        )

    return instructor


def update_instructor_service(
    db: Session,
    instructor_id: int,
    instructor_data: InstructorCreate,
):

    instructor = get_instructor_by_id(
        db,
        instructor_id
    )

    if not instructor:
        raise HTTPException(
            status_code=404,
            detail="Instructor not found."
        )

    instructor.first_name = instructor_data.first_name
    instructor.last_name = instructor_data.last_name
    instructor.email = instructor_data.email
    instructor.specialization = instructor_data.specialization

    db.commit()
    db.refresh(instructor)

    return instructor


def delete_instructor_service(
    db: Session,
    instructor_id: int,
):

    instructor = get_instructor_by_id(
        db,
        instructor_id
    )

    if not instructor:
        raise HTTPException(
            status_code=404,
            detail="Instructor not found."
        )

    delete_instructor(db, instructor)

    return {
        "message": "Instructor deleted successfully."
    }


def assign_subject_service(
    db: Session,
    instructor_id: int,
    subject_id: int
):

    instructor = get_instructor_by_id(
        db,
        instructor_id
    )

    if not instructor:
        raise HTTPException(
            status_code=404,
            detail="Instructor not found."
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

    if subject not in instructor.subjects:
        instructor.subjects.append(subject)

    db.commit()
    db.refresh(instructor)

    return {
        "message": "Subject assigned to instructor successfully."
    }