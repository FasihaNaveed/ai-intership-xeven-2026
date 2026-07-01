from fastapi import FastAPI

from src.database import Base, engine

from src.users.router import router as users_router
from src.subjects.router import router as subjects_router
from src.instructors.router import router as instructors_router
from src.chatbot.router import router as chatbot_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Management Chatbot System")


@app.get("/")
def root():
    return {"message": "System Running Successfully"}


app.include_router(users_router)
app.include_router(subjects_router)
app.include_router(instructors_router)
app.include_router(chatbot_router)