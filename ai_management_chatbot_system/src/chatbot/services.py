from fastapi import HTTPException

from src.chatbot.utils import (
    save_uploaded_file,
    load_document,
    split_document,
    create_vector_store,
    ask_question,
)


def upload_document_service(upload_file):

    try:
        # Save uploaded file
        file_path = save_uploaded_file(upload_file)

        # Load document
        documents = load_document(file_path)

        # Split into chunks
        chunks = split_document(documents)

        # Create FAISS Vector Store
        create_vector_store(chunks)

        return {
            "message": "Document uploaded successfully.",
            "file_name": upload_file.filename
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def ask_question_service(question):

    try:

        answer = ask_question(question)

        return {
            "question": question,
            "answer": answer
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )