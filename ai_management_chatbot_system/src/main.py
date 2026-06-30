from fastapi import FastAPI

from src.database import Base, engine

# Import Models
from src.users.models import User
from src.subjects.models import Subject
from src.instructors.models import Instructor

# Import Routers
from src.users.router import router as user_router
from src.subjects.router import router as subject_router
from src.instructors.router import router as instructor_router
from src.chatbot.router import router as chatbot_router

# Create Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Management Chatbot System",
    version="1.0.0",
    description="User Management + AI Chatbot System"
)

# Include Routers
app.include_router(user_router)
app.include_router(subject_router)
app.include_router(instructor_router)
app.include_router(chatbot_router)

@app.get("/")
def home():
    return {
        "message": "AI Management Chatbot System is Running Successfully"
    }