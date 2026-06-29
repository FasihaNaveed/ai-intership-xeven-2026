from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader


class DocumentLoader:

    @staticmethod
    def load_document(file_path: str):

        file = Path(file_path)

        if not file.exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        if file.suffix.lower() == ".pdf":
            loader = PyPDFLoader(str(file))

        elif file.suffix.lower() == ".docx":
            loader = Docx2txtLoader(str(file))

        else:
            raise ValueError("Unsupported file format")

        return loader.load()