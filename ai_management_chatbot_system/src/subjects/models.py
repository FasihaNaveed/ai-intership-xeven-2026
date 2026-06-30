from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from src.database import Base
from src.associations import (
    user_subject_association,
    subject_instructor_association,
)


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, unique=True, nullable=False)

    description = Column(String, nullable=True)

    users = relationship(
        "User",
        secondary=user_subject_association,
        back_populates="subjects",
    )

    instructors = relationship(
        "Instructor",
        secondary=subject_instructor_association,
        back_populates="subjects",
    )