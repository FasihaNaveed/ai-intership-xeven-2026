from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.database import get_db
from src.instructors.schemas import (
    InstructorCreate,
    AssignSubject,
)
from src.instructors.services import InstructorService

router = APIRouter(
    prefix="/instructors",
    tags=["Instructors"],
)


@router.post("/create-instructor")
async def create_instructor(
    instructor: InstructorCreate,
    db: Session = Depends(get_db),
):
    return await InstructorService.create_instructor(
        db,
        instructor,
    )


@router.get("/")
async def get_instructors(
    enable_pagination: bool = Query(
        default=False,
        description="Enable or disable pagination",
    ),
    page_size: int = Query(
        default=12,
        ge=1,
        description="Number of records per page",
    ),
    page_no: int = Query(
        default=1,
        ge=1,
        description="Current page number",
    ),
    search: str = Query(
        default="",
        description="Search instructor",
    ),
    db: Session = Depends(get_db),
):
    return await InstructorService.get_instructors(
        db=db,
        enable_pagination=enable_pagination,
        page_size=page_size,
        page_no=page_no,
        search=search,
    )


@router.get("/{instructor_id}")
async def get_instructor(
    instructor_id: int,
    db: Session = Depends(get_db),
):
    return await InstructorService.get_single_instructor(
        db,
        instructor_id,
    )


@router.put("/{instructor_id}")
async def update_instructor(
    instructor_id: int,
    instructor: InstructorCreate,
    db: Session = Depends(get_db),
):
    return await InstructorService.update_instructor(
        db,
        instructor_id,
        instructor,
    )


@router.delete("/delete-instructor")
async def delete_instructor(
    instructor_id: int,
    db: Session = Depends(get_db),
):
    return await InstructorService.delete_instructor(
        db,
        instructor_id,
    )


@router.post("/{instructor_id}/assign-subject")
async def assign_subject(
    instructor_id: int,
    data: AssignSubject,
    db: Session = Depends(get_db),
):
    return await InstructorService.assign_subject(
        db,
        instructor_id,
        data.subject_id,
    )