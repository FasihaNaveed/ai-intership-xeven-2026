from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from src.subjects.models import Subject
from src.subjects.schemas import SubjectCreate
from src.subjects.utils import (
    get_subject_by_name,
    get_subject_by_id,
    get_all_subjects,
    delete_subject,
)


def create_subject_service(db: Session, subject: SubjectCreate):

    existing_subject = get_subject_by_name(db, subject.name)

    if existing_subject:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Subject already exists."
        )

    new_subject = Subject(
        name=subject.name,
        description=subject.description,
    )

    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)

    return new_subject


def get_subjects_service(db: Session):
    return get_all_subjects(db)


def get_single_subject_service(db: Session, subject_id: int):

    subject = get_subject_by_id(db, subject_id)

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found."
        )

    return subject


def update_subject_service(
    db: Session,
    subject_id: int,
    subject_data: SubjectCreate,
):

    subject = get_subject_by_id(db, subject_id)

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found."
        )

    subject.name = subject_data.name
    subject.description = subject_data.description

    db.commit()
    db.refresh(subject)

    return subject


def delete_subject_service(db: Session, subject_id: int):

    subject = get_subject_by_id(db, subject_id)

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found."
        )

    delete_subject(db, subject)

    return {
        "message": "Subject deleted successfully."
    }