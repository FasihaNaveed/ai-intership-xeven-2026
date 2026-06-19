from fastapi import FastAPI
from pydantic import BaseModel

from app.agent import SimpleAgent

app = FastAPI()

agent = SimpleAgent()


class Query(BaseModel):
    question: str


@app.get("/")
def home():

    return {
        "message": "Day 26 Agent Running"
    }


@app.post("/ask")
def ask(query: Query):

    result = agent.run(
        query.question
    )

    return result