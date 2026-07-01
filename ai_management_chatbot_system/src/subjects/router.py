from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database import get_db
from src.subjects.schemas import SubjectCreate, SubjectCountRequest
from src.subjects.services import SubjectService

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


@router.post("/")
async def create_subject(
    subject: SubjectCreate,
    db: Session = Depends(get_db),
):
    return await SubjectService.create_subject(
        db,
        subject,
    )


@router.get("/")
async def get_subjects(
    db: Session = Depends(get_db),
):
    return await SubjectService.get_subjects(db)


@router.get("/{subject_id}")
async def get_subject(
    subject_id: int,
    db: Session = Depends(get_db),
):
    return await SubjectService.get_subject(
        db,
        subject_id,
    )


@router.put("/{subject_id}")
async def update_subject(
    subject_id: int,
    subject: SubjectCreate,
    db: Session = Depends(get_db),
):
    return await SubjectService.update_subject(
        db,
        subject_id,
        subject,
    )


@router.delete("/{subject_id}")
async def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db),
):
    return await SubjectService.delete_subject(
        db,
        subject_id,
    )


@router.post("/student-count")
async def get_student_count(
    data: SubjectCountRequest,
    db: Session = Depends(get_db),
):
    return await SubjectService.get_student_count(
        db,
        data.subject_id,
    )


@router.post("/instructor-count")
async def get_instructor_count(
    data: SubjectCountRequest,
    db: Session = Depends(get_db),
):
    return await SubjectService.get_instructor_count(
        db,
        data.subject_id,
    )