from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database import get_db

from src.subjects.schemas import (
    SubjectCreate,
    SubjectResponse,
)

from src.subjects.services import (
    create_subject_service,
    get_subjects_service,
    get_single_subject_service,
    update_subject_service,
    delete_subject_service,
)

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


@router.post("/", response_model=SubjectResponse)
def create_subject(
    subject: SubjectCreate,
    db: Session = Depends(get_db),
):
    return create_subject_service(db, subject)


@router.get("/", response_model=List[SubjectResponse])
def get_subjects(
    db: Session = Depends(get_db),
):
    return get_subjects_service(db)


@router.get("/{subject_id}", response_model=SubjectResponse)
def get_subject(
    subject_id: int,
    db: Session = Depends(get_db),
):
    return get_single_subject_service(db, subject_id)


@router.put("/{subject_id}", response_model=SubjectResponse)
def update_subject(
    subject_id: int,
    subject: SubjectCreate,
    db: Session = Depends(get_db),
):
    return update_subject_service(
        db,
        subject_id,
        subject,
    )


@router.delete("/{subject_id}")
def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db),
):
    return delete_subject_service(db, subject_id)