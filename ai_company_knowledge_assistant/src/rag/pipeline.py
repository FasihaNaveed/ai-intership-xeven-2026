from src.rag.retriever import Retriever
from src.rag.generator import Generator


class RAGPipeline:

    def __init__(self):
        self.retriever = Retriever()
        self.generator = Generator()

    def run(
        self,
        question: str
    ):

        documents = self.retriever.retrieve(
            question
        )

        answer = self.generator.generate_answer(
            question,
            documents
        )

        return {
            "answer": answer,
            "sources": documents
        }