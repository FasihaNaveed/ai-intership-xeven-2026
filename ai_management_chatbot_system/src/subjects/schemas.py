from typing import List

from pydantic import BaseModel


class SubjectCreate(BaseModel):
    name: str
    description: str | None = None


class SubjectResponse(BaseModel):
    id: int
    name: str
    description: str | None = None

    class Config:
        from_attributes = True


class SubjectsListingResponse(BaseModel):
    success: bool
    message: str
    total_records: int
    page_no: int
    page_size: int
    total_pages: int
    data: List[SubjectResponse]


class SubjectCountRequest(BaseModel):
    subject_id: int