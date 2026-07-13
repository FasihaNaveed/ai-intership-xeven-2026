from src.embeddings.embedding_service import (
    EmbeddingService
)

from src.vector_store.faiss_store import (
    FAISSStore
)


class Retriever:

    def __init__(self):
        self.embedding_service = (
            EmbeddingService()
        )

        self.vector_store = (
            FAISSStore()
        )

        try:
            self.vector_store.load()
        except Exception:
            pass

    def retrieve(
        self,
        query: str,
        top_k: int = 5
    ):

        query_embedding = (
            self.embedding_service
            .generate_embedding(query)
        )

        documents = (
            self.vector_store.search(
                query_embedding,
                top_k
            )
        )

        return documents