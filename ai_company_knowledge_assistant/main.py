from contextlib import asynccontextmanager
from fastapi import FastAPI

from src.base import Base
from src.database import engine

import src.users.models
import src.chat.models
import src.conversations.models

from src.auth.router import router as auth_router
from src.documents.router import router as documents_router
from src.users.router import router as user_router
from src.chat.router import router as chat_router
from src.conversations.router import router as conversations_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="AI Company Knowledge Assistant",
    lifespan=lifespan
)

app.include_router(auth_router)
app.include_router(documents_router)
app.include_router(user_router)
app.include_router(chat_router)
app.include_router(conversations_router)

@app.get("/")
async def root():
    return {
        "message": "AI Company Knowledge Assistant API Running Successfully"
    }