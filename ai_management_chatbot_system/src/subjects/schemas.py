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