from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.subjects.models import Subject


class SubjectUtils:

    @staticmethod
    async def get_subject_by_id(db: Session, subject_id: int):
        try:
            return db.query(Subject).filter(Subject.id == subject_id).first()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_subject_by_name(db: Session, name: str):
        try:
            return db.query(Subject).filter(Subject.name == name).first()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_subjects(db: Session):
        try:
            return db.query(Subject).all()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def delete_subject(db: Session, subject: Subject):
        try:
            db.delete(subject)
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))