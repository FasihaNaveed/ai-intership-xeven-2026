from pydantic import BaseModel


class QuestionRequest(BaseModel):
    question: str


class SearchRequest(BaseModel):
    query: str


class AnswerResponse(BaseModel):
    answer: str
    sources: list


class SearchResponse(BaseModel):
    chunks: list