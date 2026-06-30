from fastapi import (
    APIRouter,
    UploadFile,
    File,
)

from src.chatbot.schemas import (
    QuestionRequest,
    QuestionResponse,
)

from src.chatbot.services import (
    upload_document_service,
    ask_question_service,
)

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"]
)


@router.post("/upload-document")
def upload_document(
    file: UploadFile = File(...)
):
    return upload_document_service(file)


@router.post(
    "/ask-question",
    response_model=QuestionResponse,
)
def ask_question(
    request: QuestionRequest,
):
    return ask_question_service(
        request.question
    )