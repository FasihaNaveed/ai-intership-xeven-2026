from langchain_community.document_loaders import TextLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_huggingface import HuggingFaceEmbeddings

from langchain_community.vectorstores import FAISS

import os

# ==========================
# Load Documents
# ==========================

documents = []

for file in os.listdir("data"):

    if file.endswith(".txt"):

        loader = TextLoader(
            os.path.join("data", file),
            encoding="utf-8"
        )

        docs = loader.load()

        for doc in docs:

            doc.metadata["source"] = file

        documents.extend(docs)

print("Documents Loaded:", len(documents))

# ==========================
# Chunking
# ==========================

splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
)

chunks = splitter.split_documents(documents)

print("Chunks Created:", len(chunks))

# ==========================
# Embeddings
# ==========================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ==========================
# FAISS
# ==========================

vectorstore = FAISS.from_documents(
    chunks,
    embeddings
)

print("FAISS Created")

# ==========================
# Retriever
# ==========================

retriever = vectorstore.as_retriever(
    search_kwargs={"k": 4}
)

print("Retriever Ready")

# ==========================
# Query
# ==========================

question = input("\nAsk Question: ")

results = retriever.invoke(question)

print("\nAnswer Context:\n")

for i, doc in enumerate(results, start=1):

    print("=" * 50)

    print("Source:", doc.metadata["source"])

    print()

    print(doc.page_content)

    print()