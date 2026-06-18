from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
import os

# ----------------------------------
# Embedding Model
# ----------------------------------

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ----------------------------------
# Sample Documents
# ----------------------------------

documents = [
    Document(page_content="Python is a programming language."),
    Document(page_content="Machine learning uses data."),
    Document(page_content="Artificial Intelligence simulates human intelligence."),
    Document(page_content="FAISS is a vector database."),
]

# ----------------------------------
# Create Vector Store
# ----------------------------------

vectorstore = FAISS.from_documents(
    documents,
    embeddings
)

print("Vector store created.")

# ----------------------------------
# Similarity Search
# ----------------------------------

query = "What is AI?"

results = vectorstore.similarity_search_with_score(
    query,
    k=2
)

print("\nSearch Results:\n")

for doc, score in results:
    print(doc.page_content)
    print("Score:", score)
    print()

# ----------------------------------
# Save Index
# ----------------------------------

save_path = "scripts/outputs/task1/faiss_index"

vectorstore.save_local(save_path)

print("Index Saved.")

# ----------------------------------
# Load Index
# ----------------------------------

loaded_db = FAISS.load_local(
    save_path,
    embeddings,
    allow_dangerous_deserialization=True
)

print("Index Loaded.")

# ----------------------------------
# Search Again
# ----------------------------------

results = loaded_db.similarity_search(
    "vector database",
    k=2
)

print("\nLoaded Search Results:\n")

for doc in results:
    print(doc.page_content)