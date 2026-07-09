import os
import shutil

from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File
from fastapi import Form
from fastapi import status

from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db

from src.documents.services import DocumentService
from src.documents.schemas import DocumentResponse
from src.documents.schemas import DocumentCreate

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIRECTORY = "uploaded_documents"


@router.post(
    "/upload",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED
)
async def upload_document(
    document_name: str = Form(...),
    department: str = Form(...),
    document_type: str = Form(...),
    tags: str = Form(None),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):

    os.makedirs(
        UPLOAD_DIRECTORY,
        exist_ok=True
    )

    file_path = os.path.join(
        UPLOAD_DIRECTORY,
        file.filename
    )

    print("Saving file to:", file_path)

    with open(
        file_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    payload = DocumentCreate(
        document_name=document_name,
        department=department,
        document_type=document_type,
        tags=tags
    )

    document = await DocumentService.create_document(
        payload=payload,
        file_name=file.filename,
        file_path=file_path,
        db=db
    )

    return document


@router.get(
    "/",
    response_model=list[DocumentResponse]
)
async def get_documents(
    db: AsyncSession = Depends(get_db)
):
    return await DocumentService.get_documents(
        db
    )


@router.delete(
    "/{document_id}"
)
async def delete_document(
    document_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await DocumentService.delete_document(
        document_id,
        db
    )


@router.get("/health")
async def health():
    return {
        "message": "Documents module working"
    }