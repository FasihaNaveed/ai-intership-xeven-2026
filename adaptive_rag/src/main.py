from fastapi import FastAPI

from src.api.rag import router

app = FastAPI(
    title="Adaptive RAG API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Adaptive RAG API Running"
    }