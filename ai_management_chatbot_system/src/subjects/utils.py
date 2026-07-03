from math import ceil

from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from src.subjects.models import Subject


class SubjectUtils:

    @staticmethod
    async def get_subject_by_id(
        db: Session,
        subject_id: int,
    ):
        try:

            return (
                db.query(Subject)
                .filter(Subject.id == subject_id)
                .first()
            )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"Failed to get subject: {str(e)}"
            )

    @staticmethod
    async def get_subject_by_name(
        db: Session,
        name: str,
    ):
        try:

            return (
                db.query(Subject)
                .filter(Subject.name == name)
                .first()
            )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"Failed to get subject by name: {str(e)}"
            )

    @staticmethod
    async def get_all_subjects(
        db: Session,
        enable_pagination: bool = False,
        page_size: int = 12,
        page_no: int = 1,
        search: str = "",
    ):
        """
        Get Subjects Listing

        Features
        --------
        1. Pagination
        2. Search
        3. Offset
        4. Limit
        """

        try:

            query = db.query(Subject)

            # -----------------------
            # Search
            # -----------------------

            if search:

                query = query.filter(

                    or_(

                        Subject.name.ilike(
                            f"%{search}%"
                        ),

                        Subject.description.ilike(
                            f"%{search}%"
                        ),

                    )

                )

            total_records = query.count()

            # -----------------------
            # Pagination
            # -----------------------

            if enable_pagination:

                offset = (
                    (page_no - 1)
                    * page_size
                )

                subjects = (

                    query

                    .offset(offset)

                    .limit(page_size)

                    .all()

                )

                total_pages = (

                    ceil(
                        total_records
                        / page_size
                    )

                    if total_records > 0

                    else 1

                )

            else:

                subjects = query.all()

                page_no = 1

                page_size = total_records

                total_pages = 1

            return {

                "success": True,

                "message":
                "Subjects fetched successfully.",

                "total_records":
                total_records,

                "page_no":
                page_no,

                "page_size":
                page_size,

                "total_pages":
                total_pages,

                "data":
                subjects,

            }

        except Exception as e:

            raise HTTPException(

                status_code=500,

                detail=f"Failed to get subjects: {str(e)}"

            )

    @staticmethod
    async def delete_subject(
        db: Session,
        subject: Subject,
    ):
        try:

            db.delete(subject)

            db.commit()

            return True

        except Exception as e:

            db.rollback()

            raise HTTPException(

                status_code=500,

                detail=f"Failed to delete subject: {str(e)}"

            )