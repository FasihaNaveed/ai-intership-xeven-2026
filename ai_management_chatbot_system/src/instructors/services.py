from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from src.instructors.models import Instructor
from src.instructors.schemas import InstructorCreate
from src.instructors.utils import InstructorUtils
from src.subjects.utils import SubjectUtils


class InstructorService:

    @staticmethod
    async def create_instructor(
        db: Session,
        instructor_data: InstructorCreate,
    ):
        try:

            existing = await InstructorUtils.get_instructor_by_email(
                db,
                instructor_data.email,
            )

            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Instructor already exists.",
                )

            instructor = Instructor(
                first_name=instructor_data.first_name,
                last_name=instructor_data.last_name,
                email=instructor_data.email,
                specialization=instructor_data.specialization,
            )

            db.add(instructor)
            db.commit()
            db.refresh(instructor)

            return instructor

        except HTTPException:
            raise

        except Exception as e:

            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def get_instructors(
        db: Session,
        enable_pagination: bool = False,
        page_size: int = 12,
        page_no: int = 1,
        search: str = "",
    ):
        try:

            return await InstructorUtils.get_all_instructors(
                db=db,
                enable_pagination=enable_pagination,
                page_size=page_size,
                page_no=page_no,
                search=search,
            )

        except HTTPException:
            raise

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def get_single_instructor(
        db: Session,
        instructor_id: int,
    ):
        try:

            instructor = await InstructorUtils.get_instructor_by_id(
                db,
                instructor_id,
            )

            if not instructor:
                raise HTTPException(
                    status_code=404,
                    detail="Instructor not found.",
                )

            return instructor

        except HTTPException:
            raise

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=str(e),
            )
    @staticmethod
    async def update_instructor(
        db: Session,
        instructor_id: int,
        instructor_data: InstructorCreate,
    ):
        try:

            instructor = await InstructorUtils.get_instructor_by_id(
                db,
                instructor_id,
            )

            if not instructor:
                raise HTTPException(
                    status_code=404,
                    detail="Instructor not found.",
                )

            instructor.first_name = instructor_data.first_name
            instructor.last_name = instructor_data.last_name
            instructor.email = instructor_data.email
            instructor.specialization = instructor_data.specialization

            db.commit()
            db.refresh(instructor)

            return instructor

        except HTTPException:
            raise

        except Exception as e:

            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def delete_instructor(
        db: Session,
        instructor_id: int,
    ):
        try:

            instructor = await InstructorUtils.get_instructor_by_id(
                db,
                instructor_id,
            )

            if not instructor:
                raise HTTPException(
                    status_code=404,
                    detail="Instructor not found.",
                )

            await InstructorUtils.delete_instructor(
                db,
                instructor,
            )

            return {
                "message": "Instructor deleted successfully."
            }

        except HTTPException:
            raise

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=str(e),
            )
    @staticmethod
    async def assign_subject(
        db: Session,
        instructor_id: int,
        subject_id: int,
    ):
        try:

            instructor = await InstructorUtils.get_instructor_by_id(
                db,
                instructor_id,
            )

            if not instructor:
                raise HTTPException(
                    status_code=404,
                    detail="Instructor not found.",
                )

            subject = await SubjectUtils.get_subject_by_id(
                db,
                subject_id,
            )

            if not subject:
                raise HTTPException(
                    status_code=404,
                    detail="Subject not found.",
                )

            if subject not in instructor.subjects:
                instructor.subjects.append(subject)

            db.commit()
            db.refresh(instructor)

            return {
                "message": "Subject assigned successfully."
            }

        except HTTPException:
            raise

        except Exception as e:

            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=str(e),
            )