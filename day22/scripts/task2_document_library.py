import os
import json

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# ==================================
# Load Documents
# ==================================

DATA_FOLDER = "data"

documents = []

for file in os.listdir(DATA_FOLDER):

    if file.endswith(".txt"):

        loader = TextLoader(
            os.path.join(DATA_FOLDER, file),
            encoding="utf-8"
        )

        docs = loader.load()

        for doc in docs:

            doc.metadata["source"] = file
            doc.metadata["section"] = "general"

        documents.extend(docs)

print(f"Loaded Documents: {len(documents)}")

# ==================================
# Chunk Documents
# ==================================

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100
)

chunks = splitter.split_documents(documents)

print(f"Total Chunks: {len(chunks)}")

# ==================================
# Embeddings
# ==================================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ==================================
# Create FAISS Store
# ==================================

vectorstore = FAISS.from_documents(
    chunks,
    embeddings
)

print("FAISS Vector Store Created")

# ==================================
# Save Store
# ==================================

SAVE_PATH = "scripts/outputs/task2/faiss_library"

os.makedirs(SAVE_PATH, exist_ok=True)

vectorstore.save_local(SAVE_PATH)

print("Vector Store Saved")

# ==================================
# Search
# ==================================

query = input("\nEnter Search Query: ")

results = vectorstore.similarity_search(
    query,
    k=5
)

print("\nTop 5 Results\n")

for i, doc in enumerate(results, start=1):

    print("=" * 50)

    print(f"Result {i}")

    print(f"Source: {doc.metadata['source']}")

    print(f"Section: {doc.metadata['section']}")

    print("\nContent:")

    print(doc.page_content)

    print()

# ==================================
# Metadata Filtering
# ==================================

print("\nMetadata Filter Example")

filtered = [
    doc for doc in chunks
    if doc.metadata["source"] == "python.txt"
]

print(f"Chunks from python.txt: {len(filtered)}")

# ==================================
# Save Stats
# ==================================

stats = {
    "documents_loaded": len(documents),
    "chunks_created": len(chunks),
    "embedding_model": "all-MiniLM-L6-v2"
}

os.makedirs(
    "scripts/outputs/task2",
    exist_ok=True
)

with open(
    "scripts/outputs/task2/stats.json",
    "w"
) as f:

    json.dump(
        stats,
        f,
        indent=4
    )

print("\nstats.json generated successfully")