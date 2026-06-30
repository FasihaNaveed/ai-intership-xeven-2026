from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from src.database import Base
from src.associations import (
    user_instructor_association,
    subject_instructor_association,
)


class Instructor(Base):
    __tablename__ = "instructors"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String, nullable=False)

    last_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    specialization = Column(String, nullable=True)

    users = relationship(
        "User",
        secondary=user_instructor_association,
        back_populates="instructors",
    )

    subjects = relationship(
        "Subject",
        secondary=subject_instructor_association,
        back_populates="instructors",
    )