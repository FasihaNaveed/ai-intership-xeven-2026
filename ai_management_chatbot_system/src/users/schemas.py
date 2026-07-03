from typing import List

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr

    class Config:
        from_attributes = True


class UsersListingResponse(BaseModel):
    success: bool
    message: str
    total_records: int
    page_no: int
    page_size: int
    total_pages: int
    data: List[UserResponse]


class AssignSubject(BaseModel):
    subject_id: int


class AssignInstructor(BaseModel):
    instructor_id: int