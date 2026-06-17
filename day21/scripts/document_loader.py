from langchain_community.document_loaders import PyPDFLoader, TextLoader
import os

def load_document(file_path):

    print("DEBUG: Loading file ->", file_path)

    if not os.path.exists(file_path):
        print("❌ FILE NOT FOUND")
        return []

    try:
        if file_path.lower().endswith(".pdf"):
            loader = PyPDFLoader(file_path)
        else:
            loader = TextLoader(file_path, encoding="utf-8")

        docs = loader.load()

        print("DEBUG: Docs loaded =", len(docs))

        return docs

    except Exception as e:
        print("❌ Load error:", e)
        return []