import faiss
import numpy as np
import pickle
import os


class FAISSStore:

    def __init__(
        self,
        dimension: int = 384
    ):
        self.dimension = dimension

        self.index = faiss.IndexFlatL2(
            dimension
        )

        self.documents = []

    def add_documents(
        self,
        embeddings,
        documents
    ):

        embeddings = np.array(
            embeddings,
            dtype="float32"
        )

        self.index.add(
            embeddings
        )

        self.documents.extend(
            documents
        )

    def search(
        self,
        query_embedding,
        top_k: int = 5
    ):

        if len(self.documents) == 0:
            return []

        query_embedding = np.array(
            [query_embedding],
            dtype="float32"
        )

        top_k = min(
            top_k,
            len(self.documents)
        )

        distances, indices = self.index.search(
            query_embedding,
            top_k
        )

        results = []

        for idx in indices[0]:

            if (
                idx != -1 and
                idx < len(self.documents)
            ):
                results.append(
                    self.documents[idx]
                )

        return results

    def save(
        self,
        path: str = "vector_db"
    ):

        os.makedirs(
            path,
            exist_ok=True
        )

        faiss.write_index(
            self.index,
            f"{path}/index.faiss"
        )

        with open(
            f"{path}/documents.pkl",
            "wb"
        ) as file:
            pickle.dump(
                self.documents,
                file
            )

    def load(
        self,
        path: str = "vector_db"
    ):

        if not os.path.exists(
            f"{path}/index.faiss"
        ):
            return

        if not os.path.exists(
            f"{path}/documents.pkl"
        ):
            return

        self.index = faiss.read_index(
            f"{path}/index.faiss"
        )

        with open(
            f"{path}/documents.pkl",
            "rb"
        ) as file:
            self.documents = pickle.load(
                file
            )