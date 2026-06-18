from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

import os

class RAGSystem:

    def __init__(self):

        # current project path se data folder
        self.data_path = os.path.join(
            os.path.dirname(__file__),
            "data"
        )

        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        self.vectorstore = None

    # Load all text documents
    def load_documents(self):

        docs = []

        print("Loading documents...")

        if not os.path.exists(self.data_path):
            raise Exception(
                "Data folder not found. Create rag_system/data folder"
            )

        for file in os.listdir(self.data_path):

            # only txt files
            if file.endswith(".txt"):

                file_path = os.path.join(
                    self.data_path,
                    file
                )

                loader = TextLoader(
                    file_path,
                    encoding="utf-8"
                )

                loaded_docs = loader.load()

                docs.extend(loaded_docs)

                print(file, "loaded")

        print(
            "Total documents:",
            len(docs)
        )

        if len(docs) == 0:
            raise Exception(
                "No txt files found inside data folder"
            )

        return docs

    # Build vector database
    def build(self):

        docs = self.load_documents()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=300,
            chunk_overlap=50
        )

        chunks = splitter.split_documents(
            docs
        )

        print(
            "Chunks created:",
            len(chunks)
        )

        self.vectorstore = FAISS.from_documents(
            chunks,
            self.embeddings
        )

        return self.vectorstore

    # Search relevant documents
    def search(
        self,
        query,
        k=4
    ):

        if self.vectorstore is None:

            self.build()

        results = self.vectorstore.similarity_search_with_score(
            query,
            k=k
        )

        return results