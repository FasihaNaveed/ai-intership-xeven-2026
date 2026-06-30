from sqlalchemy.orm import Session

from src.instructors.models import Instructor


def get_instructor_by_email(db: Session, email: str):
    return db.query(Instructor).filter(
        Instructor.email == email
    ).first()


def get_instructor_by_id(db: Session, instructor_id: int):
    return db.query(Instructor).filter(
        Instructor.id == instructor_id
    ).first()


def get_all_instructors(db: Session):
    return db.query(Instructor).all()


def delete_instructor(db: Session, instructor):
    db.delete(instructor)
    db.commit()

def get_instructor_by_id(db: Session, instructor_id: int):
    return db.query(Instructor).filter(
        Instructor.id == instructor_id
    ).first()