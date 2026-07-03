from typing import List

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


class InstructorsListingResponse(BaseModel):
    success: bool
    message: str
    total_records: int
    page_no: int
    page_size: int
    total_pages: int
    data: List[InstructorResponse]


class AssignSubject(BaseModel):
    subject_id: int