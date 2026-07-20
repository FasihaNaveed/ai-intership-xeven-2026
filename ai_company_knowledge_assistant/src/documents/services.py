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

from src.audit_logs.services import (
    AuditLogService
)


class DocumentService:

    @staticmethod
    async def create_document(
        payload: DocumentCreate,
        file_name: str,
        file_path: str,
        db: AsyncSession
    ):

        # Check duplicate document name
        query = select(Document).where(
            Document.document_name == payload.document_name
        )

        result = await db.execute(query)

        existing_document = result.scalar_one_or_none()

        if existing_document:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Document name already exists."
            )

        # Check duplicate uploaded file
        query = select(Document).where(
            Document.file_name == file_name
        )

        result = await db.execute(query)

        existing_file = result.scalar_one_or_none()

        if existing_file:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This PDF has already been uploaded."
            )

        # Check duplicate file path
        query = select(Document).where(
            Document.file_path == file_path
        )

        result = await db.execute(query)

        existing_path = result.scalar_one_or_none()

        if existing_path:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This file already exists."
            )
        
        extracted_text = ""

        print("\n")
        print("=" * 50)
        print("FILE PATH:", file_path)
        print("=" * 50)

        if file_path.endswith(".pdf"):

            try:
                reader = PdfReader(
                    file_path
                )

                print(
                    "TOTAL PAGES:",
                    len(reader.pages)
                )

                for index, page in enumerate(
                    reader.pages
                ):

                    page_text = page.extract_text()

                    print(
                        f"PAGE {index + 1} LENGTH:",
                        len(page_text)
                        if page_text
                        else 0
                    )

                    if page_text:
                        extracted_text += (
                            page_text + "\n"
                        )

            except Exception as e:
                print(
                    "PDF Extraction Error:",
                    e
                )

        print("\n")
        print("=" * 50)
        print(
            "TOTAL EXTRACTED CHARACTERS:",
            len(extracted_text)
        )
        print("=" * 50)
        print("\n")

        if extracted_text:

            chunks = chunk_text(
                extracted_text
            )

            print(
                "TOTAL CHUNKS CREATED:",
                len(chunks)
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

            print(
                "TOTAL EMBEDDINGS:",
                len(embeddings)
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

            print(
                "TOTAL DOCUMENTS IN VECTOR DB:",
                len(
                    vector_store.documents
                )
            )

        else:
            print(
                "NO TEXT EXTRACTED FROM PDF"
            )

        document = Document(
            document_name=payload.document_name,
            file_name=file_name,
            file_path=file_path,
            department=payload.department,
            document_type=payload.document_type,
            tags=payload.tags,
            status="Uploaded"
        )

        db.add(
            document
        )

        await db.commit()

        await db.refresh(
            document
        )

        # Save Audit Log
        await AuditLogService.create_log(
            user_id=None,
            user_name="Employee",
            action="Uploaded Document",
            resource=document.document_name,
            db=db
        )

        return document

    @staticmethod
    async def get_documents(
        db: AsyncSession
    ):

        query = select(
            Document
        )

        result = await db.execute(
            query
        )

        return result.scalars().all()

    @staticmethod
    async def delete_document(
        document_id: int,
        db: AsyncSession
    ):

        query = select(
            Document
        ).where(
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

        document_name = document.document_name

        await db.delete(
            document
        )

        await db.commit()

        # Save Audit Log
        await AuditLogService.create_log(
            user_id=None,
            user_name="Employee",
            action="Deleted Document",
            resource=document_name,
            db=db
        )

        return {
            "message":
            "Document deleted successfully"
        }