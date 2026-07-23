import os
import shutil

from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File
from fastapi import Form
from fastapi import status
from fastapi.responses import FileResponse
from fastapi.responses import HTMLResponse
from fastapi import HTTPException

from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db

from src.documents.services import DocumentService
from src.documents.schemas import DocumentResponse
from src.documents.schemas import DocumentCreate
from src.documents.schemas import DocumentUpdate

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


@router.get(
    "/{document_id}",
    response_model=DocumentResponse
)
async def get_document_by_id(
    document_id: int,
    db: AsyncSession = Depends(get_db)
):
    document = await DocumentService.get_document_by_id(
        document_id,
        db
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    return document


@router.put(
    "/{document_id}",
    response_model=DocumentResponse
)
async def update_document(
    document_id: int,
    payload: DocumentUpdate,
    db: AsyncSession = Depends(get_db)
):
    document = await DocumentService.update_document(
        document_id,
        payload,
        db
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    return document


@router.get("/{document_id}/file")
async def get_document_file(
    document_id: int,
    db: AsyncSession = Depends(get_db)
):
    document = await DocumentService.get_document_by_id(
        document_id,
        db
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )

    if not os.path.exists(document.file_path):
        safe_title = document.document_name.replace("&", "&amp;").replace("<", "<").replace(">", ">")
        safe_dept = (document.department or "").replace("&", "&amp;").replace("<", "<").replace(">", ">")
        safe_type = (document.document_type or "").replace("&", "&amp;").replace("<", "<").replace(">", ">")
        safe_content = (document.document_content or "No raw text content extracted for this document.").replace("&", "&amp;").replace("<", "<").replace(">", ">")
        return HTMLResponse(content=f"""
        <html>
            <head><title>{safe_title} - Preview</title></head>
            <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: #f8fafc;">
                <h2>{safe_title}</h2>
                <p><strong>Department:</strong> {safe_dept} | <strong>Type:</strong> {safe_type}</p>
                <hr style="border-color: #334155; margin: 20px 0;">
                <div style="background: #1e293b; padding: 20px; border-radius: 8px; white-space: pre-wrap;">
                    {safe_content}
                </div>
            </body>
        </html>
        """)

    return FileResponse(
        path=document.file_path,
        filename=document.file_name,
        media_type="application/octet-stream"
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
