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

        print("\n")
        print("=" * 50)
        print("QUESTION:", question)
        print("RETRIEVED DOCUMENTS:", documents)
        print("=" * 50)
        print("\n")

        if not documents:
            return {
                "answer": (
                    "I could not find this information "
                    "in the uploaded company documents."
                ),
                "sources": []
            }

        # documents already contain strings
        context_documents = documents

        answer = self.generator.generate_answer(
            question,
            context_documents
        )

        # temporary source handling
        sources = [
            "Uploaded Company Documents"
        ]

        return {
            "answer": answer,
            "sources": sources
        }