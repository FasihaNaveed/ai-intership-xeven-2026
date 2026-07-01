from pydantic import BaseModel, EmailStr


class InstructorCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    specialization: str | None = None


class InstructorResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    specialization: str | None = None

    class Config:
        from_attributes = True


class AssignSubject(BaseModel):
    subject_id: int