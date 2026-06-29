from fastapi import APIRouter
from pydantic import BaseModel
from langchain_core.messages import HumanMessage

from src.graph.graph import graph

router = APIRouter(
    prefix="/rag",
    tags=["Adaptive RAG"]
)


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):

    result = graph.invoke(
        {
            "messages": [
                HumanMessage(
                    content=request.question
                )
            ]
        }
    )

    return {
        "question": request.question,
        "answer": result["messages"][-1].content
    }