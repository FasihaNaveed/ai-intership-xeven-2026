from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import json

from app.database import Base, engine, get_db
from app.schemas import DocumentCreate
from app.crud import (
    create_document,
    get_documents,
    save_conversation,
    get_conversations,
    get_stats
)

from app.utils import is_allowed

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Day 27 Production RAG API")


# =========================
# MIDDLEWARE (Rate Limit)
# =========================
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):

    ip = request.client.host

    if not is_allowed(ip):
        return JSONResponse(
            status_code=429,
            content={"error": "Rate limit exceeded (5 requests/min)"}
        )

    response = await call_next(request)
    return response


# =========================
# HEALTH CHECK
# =========================
@app.get("/health")
def health():
    return {
        "status": "ok",
        "message": "System running",
        "docs": "/docs"
    }


# =========================
# DOCUMENTS
# =========================
@app.post("/documents")
def add_document(doc: DocumentCreate, db: Session = Depends(get_db)):
    return create_document(db, doc.title, doc.content)


@app.get("/documents")
def list_docs(db: Session = Depends(get_db)):
    return get_documents(db)


# =========================
# CONVERSATIONS
# =========================
@app.post("/conversation")
def add_conversation(question: str, answer: str, db: Session = Depends(get_db)):
    return save_conversation(db, question, answer)


@app.get("/conversation")
def list_conversations(db: Session = Depends(get_db)):
    return get_conversations(db)


# =========================
# ANALYTICS
# =========================
@app.get("/analytics")
def analytics(db: Session = Depends(get_db)):
    return get_stats(db)


# =========================
# EXPORT DATA (NEW)
# =========================
@app.get("/export")
def export_data(db: Session = Depends(get_db)):

    data = {
        "documents": [d.__dict__ for d in get_documents(db)],
        "conversations": [c.__dict__ for c in get_conversations(db)]
    }

    # remove SQLAlchemy internal state
    for item in data["documents"]:
        item.pop("_sa_instance_state", None)

    for item in data["conversations"]:
        item.pop("_sa_instance_state", None)

    return data