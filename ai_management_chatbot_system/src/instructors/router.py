from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database import get_db

from src.instructors.schemas import (
    InstructorCreate,
    InstructorResponse,
    AssignSubject,
)

from src.instructors.services import (
    create_instructor_service,
    get_instructors_service,
    get_single_instructor_service,
    update_instructor_service,
    delete_instructor_service,
    assign_subject_service,
)

router = APIRouter(
    prefix="/instructors",
    tags=["Instructors"]
)


@router.post("/", response_model=InstructorResponse)
def create_instructor(
    instructor: InstructorCreate,
    db: Session = Depends(get_db),
):
    return create_instructor_service(
        db,
        instructor,
    )


@router.get("/", response_model=List[InstructorResponse])
def get_instructors(
    db: Session = Depends(get_db),
):
    return get_instructors_service(db)


@router.get("/{instructor_id}", response_model=InstructorResponse)
def get_instructor(
    instructor_id: int,
    db: Session = Depends(get_db),
):
    return get_single_instructor_service(
        db,
        instructor_id,
    )


@router.put("/{instructor_id}", response_model=InstructorResponse)
def update_instructor(
    instructor_id: int,
    instructor: InstructorCreate,
    db: Session = Depends(get_db),
):
    return update_instructor_service(
        db,
        instructor_id,
        instructor,
    )


@router.delete("/{instructor_id}")
def delete_instructor(
    instructor_id: int,
    db: Session = Depends(get_db),
):
    return delete_instructor_service(
        db,
        instructor_id,
    )


@router.post("/{instructor_id}/assign-subject")
def assign_subject(
    instructor_id: int,
    data: AssignSubject,
    db: Session = Depends(get_db)
):
    return assign_subject_service(
        db,
        instructor_id,
        data.subject_id
    )