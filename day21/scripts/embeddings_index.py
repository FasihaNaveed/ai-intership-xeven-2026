import os
import sys
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

from chunker import create_chunks
from document_loader import load_document

print("🚀 FILE STARTED")

model = SentenceTransformer("sentence-transformers/paraphrase-MiniLM-L3-v2")

class VectorStore:

    def __init__(self):
        self.index = None
        self.chunks = []

    def build(self, chunks):

        if not chunks:
            print("❌ No chunks received")
            return

        self.chunks = chunks
        texts = [c.page_content for c in chunks]

        embeddings = model.encode(texts)
        embeddings = np.array(embeddings)

        if len(embeddings.shape) == 1:
            embeddings = np.expand_dims(embeddings, axis=0)

        dim = embeddings.shape[1]

        self.index = faiss.IndexFlatL2(dim)
        self.index.add(embeddings.astype("float32"))

        print("✅ FAISS ready")

    def search(self, query, k=2):

        if self.index is None:
            return []

        q = model.encode([query])
        q = np.array(q).astype("float32")

        _, idx = self.index.search(q, k)

        return [self.chunks[i] for i in idx[0]]


if __name__ == "__main__":

    file_path = os.path.join(BASE_DIR, "data", "memo_cloud.txt")

    docs = load_document(file_path)
    chunks = create_chunks(docs)

    print("FINAL CHUNKS:", len(chunks))

    store = VectorStore()
    store.build(chunks)

    results = store.search("machine learning", k=2)

    for r in results:
        print("➡️", r.page_content)