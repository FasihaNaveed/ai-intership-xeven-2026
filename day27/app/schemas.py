from pydantic import BaseModel


# Document
class DocumentCreate(BaseModel):
    title: str
    content: str


class DocumentResponse(DocumentCreate):
    id: int

    class Config:
        from_attributes = True


# Conversation
class ConversationCreate(BaseModel):
    question: str
    answer: str


class ConversationResponse(ConversationCreate):
    id: int

    class Config:
        from_attributes = True


# Thread
class ThreadCreate(BaseModel):
    name: str