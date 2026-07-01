# src/chatbot/utils.py

import os
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from src.settings import GROQ_API_KEY

DOCUMENT_FOLDER = "documents"
VECTOR_STORE_FOLDER = "vector_store"


class ChatbotUtils:

    @staticmethod
    async def save_uploaded_file(upload_file):
        try:
            os.makedirs(DOCUMENT_FOLDER, exist_ok=True)

            file_path = os.path.join(DOCUMENT_FOLDER, upload_file.filename)

            with open(file_path, "wb") as f:
                f.write(upload_file.file.read())

            return file_path

        except Exception as e:
            raise Exception(f"Failed to save file: {e}")

    @staticmethod
    async def load_document(file_path: str):
        try:
            ext = file_path.split(".")[-1].lower()

            if ext == "pdf":
                loader = PyPDFLoader(file_path)
            elif ext == "docx":
                loader = Docx2txtLoader(file_path)
            elif ext == "txt":
                loader = TextLoader(file_path)
            else:
                raise Exception("Unsupported file format")

            return loader.load()

        except Exception as e:
            raise Exception(f"Failed to load document: {e}")

    @staticmethod
    async def split_document(documents):
        try:
            splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200,
            )
            return splitter.split_documents(documents)

        except Exception as e:
            raise Exception(f"Failed to split document: {e}")

    @staticmethod
    async def get_embeddings():
        return HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

    @staticmethod
    async def create_vector_store(chunks):
        try:
            embeddings = await ChatbotUtils.get_embeddings()

            vector_store = FAISS.from_documents(chunks, embeddings)

            os.makedirs(VECTOR_STORE_FOLDER, exist_ok=True)
            vector_store.save_local(VECTOR_STORE_FOLDER)

            return vector_store

        except Exception as e:
            raise Exception(f"Failed to create vector store: {e}")

    @staticmethod
    async def load_vector_store():
        try:
            embeddings = await ChatbotUtils.get_embeddings()

            return FAISS.load_local(
                VECTOR_STORE_FOLDER,
                embeddings,
                allow_dangerous_deserialization=True,
            )

        except Exception as e:
            raise Exception(f"Failed to load vector store: {e}")

    @staticmethod
    async def get_llm():
        return ChatGroq(
            groq_api_key=GROQ_API_KEY,
            model_name="meta-llama/llama-4-scout-17b-16e-instruct",
        )

    @staticmethod
    async def get_retriever():
        vector_store = await ChatbotUtils.load_vector_store()
        return vector_store.as_retriever()

    @staticmethod
    async def ask_question(question: str):
        try:
            retriever = await ChatbotUtils.get_retriever()
            docs = retriever.invoke(question)

            context = "\n\n".join([d.page_content for d in docs])

            llm = await ChatbotUtils.get_llm()

            prompt = f"""
Use only the context below to answer the question.

Context:
{context}

Question:
{question}

Answer:
"""

            response = llm.invoke(prompt)
            return {"answer": response.content}

        except Exception as e:
            raise Exception(f"Failed to answer question: {e}")