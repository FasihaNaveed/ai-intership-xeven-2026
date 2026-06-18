import os
import json
import time
import psutil

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_huggingface import HuggingFaceEmbeddings

from langchain_community.vectorstores import FAISS
from langchain_community.vectorstores import Chroma

# =====================================
# Load Documents
# =====================================

documents = []

for file in os.listdir("data"):

    if file.endswith(".txt"):

        loader = TextLoader(
            os.path.join("data", file),
            encoding="utf-8"
        )

        docs = loader.load()

        documents.extend(docs)

# =====================================
# Chunking
# =====================================

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100
)

chunks = splitter.split_documents(documents)

# =====================================
# Embeddings
# =====================================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# =====================================
# FAISS Indexing
# =====================================

start = time.time()

faiss_db = FAISS.from_documents(
    chunks,
    embeddings
)

faiss_index_time = time.time() - start

# =====================================
# Chroma Indexing
# =====================================

start = time.time()

chroma_db = Chroma.from_documents(
    chunks,
    embeddings,
    persist_directory="scripts/outputs/task3/chroma_db"
)

chroma_index_time = time.time() - start

# =====================================
# Query Latency FAISS
# =====================================

query = "What is Python?"

start = time.time()

faiss_results = faiss_db.similarity_search(
    query,
    k=5
)

faiss_latency = time.time() - start

# =====================================
# Query Latency Chroma
# =====================================

start = time.time()

chroma_results = chroma_db.similarity_search(
    query,
    k=5
)

chroma_latency = time.time() - start

# =====================================
# Memory Usage
# =====================================

memory_usage_mb = psutil.Process().memory_info().rss / 1024 / 1024

# =====================================
# Report
# =====================================

report = {

    "documents_loaded": len(documents),

    "chunks_created": len(chunks),

    "faiss": {

        "indexing_time_seconds":
        round(faiss_index_time, 4),

        "query_latency_seconds":
        round(faiss_latency, 4),

        "results_returned":
        len(faiss_results)
    },

    "chroma": {

        "indexing_time_seconds":
        round(chroma_index_time, 4),

        "query_latency_seconds":
        round(chroma_latency, 4),

        "results_returned":
        len(chroma_results)
    },

    "memory_usage_mb":
    round(memory_usage_mb, 2),

    "conclusion":
    "FAISS is faster for local similarity search. Chroma provides persistence and richer database features."
}

# =====================================
# Save Report
# =====================================

os.makedirs(
    "scripts/outputs/task3",
    exist_ok=True
)

with open(
    "scripts/outputs/task3/comparison_report.json",
    "w"
) as f:

    json.dump(
        report,
        f,
        indent=4
    )

print("\nComparison Complete\n")

print(json.dumps(
    report,
    indent=4
))