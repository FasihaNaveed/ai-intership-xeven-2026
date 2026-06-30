import os
import pickle

from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    TextLoader,
)

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.vectorstores import FAISS

from langchain_huggingface import HuggingFaceEmbeddings

from langchain_groq import ChatGroq

from src.settings import GROQ_API_KEY


DOCUMENT_FOLDER = "documents"
VECTOR_STORE_FOLDER = "vector_store"


# -----------------------------
# Save Uploaded File
# -----------------------------
def save_uploaded_file(upload_file):

    os.makedirs(DOCUMENT_FOLDER, exist_ok=True)

    file_path = os.path.join(
        DOCUMENT_FOLDER,
        upload_file.filename
    )

    with open(file_path, "wb") as file:
        file.write(upload_file.file.read())

    return file_path


# -----------------------------
# Load Document
# -----------------------------
def load_document(file_path):

    extension = file_path.split(".")[-1].lower()

    if extension == "pdf":
        loader = PyPDFLoader(file_path)

    elif extension == "docx":
        loader = Docx2txtLoader(file_path)

    elif extension == "txt":
        loader = TextLoader(file_path)

    else:
        raise Exception("Unsupported file format.")

    return loader.load()


# -----------------------------
# Split Document
# -----------------------------
def split_document(documents):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )

    return splitter.split_documents(documents)


# -----------------------------
# Embedding Model
# -----------------------------
def get_embeddings():

    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )


# -----------------------------
# Create Vector Store
# -----------------------------
def create_vector_store(chunks):

    embeddings = get_embeddings()

    vector_store = FAISS.from_documents(
        chunks,
        embeddings,
    )

    os.makedirs(VECTOR_STORE_FOLDER, exist_ok=True)

    vector_store.save_local(VECTOR_STORE_FOLDER)

    return vector_store


# -----------------------------
# Load Vector Store
# -----------------------------
def load_vector_store():

    embeddings = get_embeddings()

    return FAISS.load_local(
        VECTOR_STORE_FOLDER,
        embeddings,
        allow_dangerous_deserialization=True,
    )


# -----------------------------
# LLM
# -----------------------------
def get_llm():

    return ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name="meta-llama/llama-4-scout-17b-16e-instruct",
    )


# -----------------------------
# Retriever
# -----------------------------
def get_retriever():

    vector_store = load_vector_store()

    return vector_store.as_retriever()


# -----------------------------
# Ask Question
# -----------------------------
def ask_question(question):

    retriever = get_retriever()

    docs = retriever.invoke(question)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    llm = get_llm()

    prompt = f"""
Use only the context below to answer the user's question.

Context:
{context}

Question:
{question}

Answer:
"""

    response = llm.invoke(prompt)

    return response.content