from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DocumentCreate(BaseModel):
    document_name: str
    department: str
    document_type: str
    tags: Optional[str] = None


class DocumentUpdate(BaseModel):
    document_name: Optional[str] = None
    department: Optional[str] = None
    document_type: Optional[str] = None
    tags: Optional[str] = None
    document_content: Optional[str] = None


class DocumentResponse(BaseModel):
    id: int
    document_name: str
    file_name: str
    file_path: str
    document_content: Optional[str] = None
    department: str
    document_type: str
    tags: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
