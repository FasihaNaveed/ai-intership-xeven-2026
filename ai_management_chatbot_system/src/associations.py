from sqlalchemy import Table, Column, Integer, ForeignKey

from src.database import Base

# User ↔ Subject (Many-to-Many)
user_subject_association = Table(
    "user_subject_association",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("subject_id", Integer, ForeignKey("subjects.id"), primary_key=True),
)

# User ↔ Instructor (Many-to-Many)
user_instructor_association = Table(
    "user_instructor_association",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("instructor_id", Integer, ForeignKey("instructors.id"), primary_key=True),
)

# Subject ↔ Instructor (Many-to-Many)
subject_instructor_association = Table(
    "subject_instructor_association",
    Base.metadata,
    Column("subject_id", Integer, ForeignKey("subjects.id"), primary_key=True),
    Column("instructor_id", Integer, ForeignKey("instructors.id"), primary_key=True),
)