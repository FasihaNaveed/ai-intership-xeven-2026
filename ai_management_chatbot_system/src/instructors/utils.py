from math import ceil

from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from src.instructors.models import Instructor


class InstructorUtils:

    @staticmethod
    async def get_instructor_by_id(
        db: Session,
        instructor_id: int,
    ):
        try:

            return (
                db.query(Instructor)
                .filter(Instructor.id == instructor_id)
                .first()
            )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"Failed to get instructor: {str(e)}",
            )

    @staticmethod
    async def get_instructor_by_email(
        db: Session,
        email: str,
    ):
        try:

            return (
                db.query(Instructor)
                .filter(Instructor.email == email)
                .first()
            )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"Failed to get instructor by email: {str(e)}",
            )

    @staticmethod
    async def get_all_instructors(
        db: Session,
        enable_pagination: bool = False,
        page_size: int = 12,
        page_no: int = 1,
        search: str = "",
    ):
        try:

            query = db.query(Instructor)

            if search:

                query = query.filter(

                    or_(

                        Instructor.first_name.ilike(
                            f"%{search}%"
                        ),

                        Instructor.last_name.ilike(
                            f"%{search}%"
                        ),

                        Instructor.email.ilike(
                            f"%{search}%"
                        ),

                        Instructor.specialization.ilike(
                            f"%{search}%"
                        ),

                    )

                )

            total_records = query.count()

            if enable_pagination:

                offset = (page_no - 1) * page_size

                instructors = (
                    query
                    .offset(offset)
                    .limit(page_size)
                    .all()
                )

                total_pages = (
                    ceil(total_records / page_size)
                    if total_records > 0
                    else 1
                )

            else:

                instructors = query.all()

                page_no = 1
                page_size = total_records
                total_pages = 1

            return {

                "success": True,

                "message": "Instructors fetched successfully.",

                "total_records": total_records,

                "page_no": page_no,

                "page_size": page_size,

                "total_pages": total_pages,

                "data": instructors,

            }

        except Exception as e:

            raise HTTPException(

                status_code=500,

                detail=f"Failed to get instructors: {str(e)}",

            )

    @staticmethod
    async def delete_instructor(
        db: Session,
        instructor: Instructor,
    ):
        try:

            db.delete(instructor)

            db.commit()

            return True

        except Exception as e:

            db.rollback()

            raise HTTPException(

                status_code=500,

                detail=f"Failed to delete instructor: {str(e)}",

            )