from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from src.subjects.models import Subject
from src.subjects.schemas import SubjectCreate
from src.subjects.utils import SubjectUtils
from src.instructors.utils import InstructorUtils


class SubjectService:

    @staticmethod
    async def create_subject(db: Session, subject_data: SubjectCreate):
        try:

            existing = await SubjectUtils.get_subject_by_name(db, subject_data.name)
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Subject already exists."
                )

            subject = Subject(
                name=subject_data.name,
                description=subject_data.description
            )

            db.add(subject)
            db.commit()
            db.refresh(subject)

            # DEFAULT INSTRUCTOR RULE
            instructors = await InstructorUtils.get_all_instructors(db)

            if instructors:
                subject.instructors.append(instructors[0])
                db.commit()
                db.refresh(subject)

            return subject

        except HTTPException:
            raise
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_subjects(db: Session):
        return await SubjectUtils.get_all_subjects(db)

    @staticmethod
    async def get_subject(db: Session, subject_id: int):
        subject = await SubjectUtils.get_subject_by_id(db, subject_id)

        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")

        return subject

    @staticmethod
    async def update_subject(db: Session, subject_id: int, subject_data: SubjectCreate):
        subject = await SubjectUtils.get_subject_by_id(db, subject_id)

        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")

        subject.name = subject_data.name
        subject.description = subject_data.description

        db.commit()
        db.refresh(subject)

        return subject

    @staticmethod
    async def delete_subject(db: Session, subject_id: int):
        subject = await SubjectUtils.get_subject_by_id(db, subject_id)

        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")

        db.delete(subject)
        db.commit()

        return {"message": "Subject deleted successfully"}

    @staticmethod
    async def get_student_count(db: Session, subject_id: int):
        subject = await SubjectUtils.get_subject_by_id(db, subject_id)

        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")

        return {
            "subject_id": subject.id,
            "subject_name": subject.name,
            "student_count": len(subject.users)
        }

    @staticmethod
    async def get_instructor_count(db: Session, subject_id: int):
        subject = await SubjectUtils.get_subject_by_id(db, subject_id)

        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")

        return {
            "subject_id": subject.id,
            "subject_name": subject.name,
            "instructor_count": len(subject.instructors)
        }