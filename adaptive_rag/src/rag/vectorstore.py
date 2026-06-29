from langchain_community.vectorstores import FAISS

from src.rag.embeddings import get_embedding_model


class VectorStore:

    @staticmethod
    def create(chunks):

        embedding = get_embedding_model()

        vectorstore = FAISS.from_documents(
            documents=chunks,
            embedding=embedding
        )

        return vectorstore