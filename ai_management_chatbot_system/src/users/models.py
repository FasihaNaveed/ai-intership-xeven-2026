from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from src.database import Base
from src.associations import (
    user_subject_association,
    user_instructor_association,
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String, nullable=False)

    last_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    subjects = relationship(
        "Subject",
        secondary=user_subject_association,
        back_populates="users",
    )

    instructors = relationship(
        "Instructor",
        secondary=user_instructor_association,
        back_populates="users",
    )