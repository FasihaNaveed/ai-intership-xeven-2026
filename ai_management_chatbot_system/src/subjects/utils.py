from sqlalchemy.orm import Session

from src.subjects.models import Subject


def get_subject_by_name(db: Session, name: str):
    return db.query(Subject).filter(Subject.name == name).first()


def get_subject_by_id(db: Session, subject_id: int):
    return db.query(Subject).filter(Subject.id == subject_id).first()


def get_all_subjects(db: Session):
    return db.query(Subject).all()


def delete_subject(db: Session, subject):
    db.delete(subject)
    db.commit()