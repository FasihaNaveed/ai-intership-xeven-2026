from fastapi import FastAPI

from src.api.user_routes import router
from src.middlewares.request_logger import log_requests
from src.database import engine
from src.models import Base

app = FastAPI()


@app.on_event("startup")
async def startup():

    async with engine.begin() as conn:

        await conn.run_sync(
            Base.metadata.create_all
        )


app.middleware("http")(log_requests)

app.include_router(router)