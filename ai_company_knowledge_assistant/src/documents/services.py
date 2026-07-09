from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from src.documents.models import Document
from src.documents.schemas import DocumentCreate


class DocumentService:

    @staticmethod
    async def create_document(
        payload: DocumentCreate,
        file_name: str,
        file_path: str,
        db: AsyncSession
    ):

        document = Document(
            document_name=payload.document_name,
            file_name=file_name,
            file_path=file_path,
            department=payload.department,
            document_type=payload.document_type,
            tags=payload.tags,
            status="Uploaded"
        )

        db.add(document)

        await db.commit()

        await db.refresh(document)

        return document

    @staticmethod
    async def get_documents(
        db: AsyncSession
    ):

        query = select(Document)

        result = await db.execute(query)

        return result.scalars().all()

    @staticmethod
    async def delete_document(
        document_id: int,
        db: AsyncSession
    ):

        query = select(Document).where(
            Document.id == document_id
        )

        result = await db.execute(query)

        document = result.scalar_one_or_none()

        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found"
            )

        await db.delete(document)

        await db.commit()

        return {
            "message": "Document deleted successfully"
        }