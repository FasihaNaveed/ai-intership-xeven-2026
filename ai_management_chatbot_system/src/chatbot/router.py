# src/chatbot/router.py

from fastapi import APIRouter, UploadFile, File, Form
from src.chatbot.utils import ChatbotUtils

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = await ChatbotUtils.save_uploaded_file(file)

    docs = await ChatbotUtils.load_document(file_path)
    chunks = await ChatbotUtils.split_document(docs)
    await ChatbotUtils.create_vector_store(chunks)

    return {
        "message": "File uploaded and processed successfully"
    }


@router.post("/ask")
async def ask_question(question: str = Form(...)):
    response = await ChatbotUtils.ask_question(question)

    return response