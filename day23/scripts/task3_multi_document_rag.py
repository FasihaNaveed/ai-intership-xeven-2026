import os
import json
from datetime import date

from langchain_community.document_loaders import (
    TextLoader,
    PyPDFLoader
)

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_huggingface import HuggingFaceEmbeddings

from langchain_community.vectorstores import FAISS

# ==========================
# LOAD DOCUMENTS
# ==========================

documents = []

data_folder = "data"

for file in os.listdir(data_folder):

    file_path = os.path.join(data_folder, file)

    # TEXT FILES
    if file.endswith(".txt"):

        loader = TextLoader(
            file_path,
            encoding="utf-8"
        )

        docs = loader.load()

        for doc in docs:
            doc.metadata["source"] = file
            doc.metadata["source_type"] = "text"
            doc.metadata["date"] = str(date.today())

        documents.extend(docs)

    # PDF FILES
    elif file.endswith(".pdf"):

        loader = PyPDFLoader(file_path)

        docs = loader.load()

        for doc in docs:
            doc.metadata["source"] = file
            doc.metadata["source_type"] = "pdf"
            doc.metadata["date"] = str(date.today())

        documents.extend(docs)

print("Documents Loaded:", len(documents))

# ==========================
# CHUNKING
# ==========================

splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
)

chunks = splitter.split_documents(documents)

print("Chunks Created:", len(chunks))

# ==========================
# EMBEDDINGS
# ==========================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ==========================
# VECTOR STORE
# ==========================

vectorstore = FAISS.from_documents(
    chunks,
    embeddings
)

print("FAISS Ready")

# ==========================
# QUERY
# ==========================

query = input("\nAsk Question: ")

results = vectorstore.similarity_search_with_score(
    query,
    k=5
)

print("\nRESULTS\n")

report = []

for doc, score in results:

    print("=" * 50)

    print("Source:", doc.metadata["source"])
    print("Type:", doc.metadata["source_type"])
    print("Score:", round(score, 2))
    print()

    print(doc.page_content)
    print()

    report.append(
        {
            "source": doc.metadata["source"],
            "source_type": doc.metadata["source_type"],
            "score": float(score)
        }
    )

# ==========================
# SAVE REPORT
# ==========================

output_folder = "scripts/outputs/task3"

os.makedirs(
    output_folder,
    exist_ok=True
)

report_path = os.path.join(
    output_folder,
    "report.json"
)

with open(
    report_path,
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        report,
        f,
        indent=4
    )

print("\nreport.json generated successfully")
print("Saved at:", report_path)