from contextlib import asynccontextmanager
from fastapi import FastAPI

from src.base import Base
from src.database import engine

import src.users.models
import src.chat.models
import src.conversations.models
import src.documents.models
import src.audit_logs.models

from src.auth.router import router as auth_router
from src.documents.router import router as documents_router
from src.users.router import router as user_router
from src.chat.router import router as chat_router
from src.conversations.router import router as conversations_router
from src.analytics.router import router as analytics_router
from src.audit_logs.router import router as audit_logs_router

from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="AI Company Knowledge Assistant",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(documents_router)
app.include_router(user_router)
app.include_router(chat_router)
app.include_router(conversations_router)
app.include_router(analytics_router)
app.include_router(audit_logs_router)

@app.get("/")
async def root():
    return {
        "message": "AI Company Knowledge Assistant API Running Successfully"
    }