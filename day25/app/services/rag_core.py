import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

from app.services.bm25_search import BM25Retriever
from app.services.hybrid_search import HybridRetriever
from app.services.reranker import rerank


class RAGSystem:

    def __init__(self):

        self.data_path = "data"
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        self.vectorstore = None
        self.chunks = []
        self.bm25 = None
        self.hybrid = None

    # Load docs
    def load_documents(self):

        docs = []

        for file in os.listdir(self.data_path):
            if file.endswith(".txt"):

                loader = TextLoader(
                    os.path.join(self.data_path, file),
                    encoding="utf-8"
                )

                docs.extend(loader.load())

        return docs

    # Build index
    def build(self):

        docs = self.load_documents()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=300,
            chunk_overlap=50
        )

        self.chunks = splitter.split_documents(docs)

        self.vectorstore = FAISS.from_documents(
            self.chunks,
            self.embeddings
        )

        self.bm25 = BM25Retriever(self.chunks)

        self.hybrid = HybridRetriever(
            self.vectorstore,
            self.bm25
        )

    # 🔥 ADD NEW DOCUMENT (UPLOAD FEATURE)
    def add_document(self, text: str):

        new_doc = TextLoader.from_string(text)

        chunks = RecursiveCharacterTextSplitter(
            chunk_size=300,
            chunk_overlap=50
        ).create_documents([text])

        if self.vectorstore is None:
            self.build()
        else:
            self.vectorstore.add_documents(chunks)
            self.chunks.extend(chunks)

            self.bm25 = BM25Retriever(self.chunks)
            self.hybrid = HybridRetriever(
                self.vectorstore,
                self.bm25
            )

    # Search + rerank
    def search(self, query):

        docs = self.hybrid.search(query)

        return rerank(query, docs, top_k=5)