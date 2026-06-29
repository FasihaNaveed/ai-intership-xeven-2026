from langchain_huggingface import HuggingFaceEmbeddings

from src.core.settings import settings


def get_embedding_model():
    return HuggingFaceEmbeddings(
        model_name=settings.EMBEDDING_MODEL
    )