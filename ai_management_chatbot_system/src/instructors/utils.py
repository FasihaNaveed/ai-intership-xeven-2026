from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.instructors.models import Instructor


class InstructorUtils:

    @staticmethod
    async def get_instructor_by_id(db: Session, instructor_id: int):
        try:
            return db.query(Instructor).filter(Instructor.id == instructor_id).first()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_instructor_by_email(db: Session, email: str):
        try:
            return db.query(Instructor).filter(Instructor.email == email).first()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_instructors(db: Session):
        try:
            return db.query(Instructor).all()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def delete_instructor(db: Session, instructor: Instructor):
        try:
            db.delete(instructor)
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))