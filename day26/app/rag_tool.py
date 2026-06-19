from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import os

class RAGTool:

    def __init__(self):

        self.data_path = "data"

        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        self.vectorstore = None

    def build(self):

        docs = []

        for file in os.listdir(self.data_path):
            loader = TextLoader(os.path.join(self.data_path, file))
            docs.extend(loader.load())

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=300,
            chunk_overlap=50
        )

        chunks = splitter.split_documents(docs)

        self.vectorstore = FAISS.from_documents(
            chunks,
            self.embeddings
        )

    def search(self, query: str):
        if self.vectorstore is None:
            self.build()

        results = self.vectorstore.similarity_search(query, k=3)

        return [r.page_content for r in results]