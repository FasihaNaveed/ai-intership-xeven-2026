from pypdf import PdfReader

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from src.documents.models import Document
from src.documents.schemas import DocumentCreate

from src.embeddings.embedding_service import (
    EmbeddingService
)

from src.embeddings.utils import (
    chunk_text
)

from src.vector_store.faiss_store import (
    FAISSStore
)


class DocumentService:

    @staticmethod
    async def create_document(
        payload: DocumentCreate,
        file_name: str,
        file_path: str,
        db: AsyncSession
    ):

        # ==========================
        # PDF Text Extraction
        # ==========================
        extracted_text = ""

        if file_path.endswith(".pdf"):
            try:
                reader = PdfReader(file_path)

                for page in reader.pages:
                    page_text = page.extract_text()

                    if page_text:
                        extracted_text += page_text + "\n"

            except Exception as e:
                print(
                    f"PDF Extraction Error: {e}"
                )

        # ==========================
        # Chunking + Embeddings
        # ==========================
        if extracted_text:

            chunks = chunk_text(
                extracted_text
            )

            embedding_service = (
                EmbeddingService()
            )

            embeddings = (
                embedding_service
                .generate_embeddings(
                    chunks
                )
            )

            vector_store = (
                FAISSStore()
            )

            try:
                vector_store.load()
            except Exception:
                pass

            vector_store.add_documents(
                embeddings,
                chunks
            )

            vector_store.save()

        # ==========================
        # Save Document Metadata
        # ==========================
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

        result = await db.execute(
            query
        )

        return result.scalars().all()

    @staticmethod
    async def delete_document(
        document_id: int,
        db: AsyncSession
    ):

        query = select(Document).where(
            Document.id == document_id
        )

        result = await db.execute(
            query
        )

        document = (
            result.scalar_one_or_none()
        )

        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found"
            )

        await db.delete(
            document
        )

        await db.commit()

        return {
            "message":
            "Document deleted successfully"
        }