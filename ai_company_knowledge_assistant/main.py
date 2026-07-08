from contextlib import asynccontextmanager
from fastapi import FastAPI

from src.base import Base
from src.database import engine

import src.users.models

from src.auth.router import router as auth_router

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


@app.get("/")
async def root():
    return {
        "message": "AI Company Knowledge Assistant API Running Successfully"
    }