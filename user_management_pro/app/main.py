from fastapi import FastAPI

from app.api.user_routes import router
from app.middlewares.request_logger import log_requests

from app.database import engine
from app.models import Base


app = FastAPI()


@app.on_event("startup")
async def startup():

    async with engine.begin() as conn:

        await conn.run_sync(
            Base.metadata.create_all
        )


app.middleware("http")(log_requests)

app.include_router(router)