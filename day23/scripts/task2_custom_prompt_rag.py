import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate

# =========================
# LOAD DOCUMENTS
# =========================

documents = []

for file in os.listdir("data"):
    if file.endswith(".txt"):
        loader = TextLoader(os.path.join("data", file), encoding="utf-8")
        docs = loader.load()

        for d in docs:
            d.metadata["source"] = file

        documents.extend(docs)

print("Documents Loaded:", len(documents))

# =========================
# CHUNKING
# =========================

splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
)

chunks = splitter.split_documents(documents)

print("Chunks Created:", len(chunks))

# =========================
# EMBEDDINGS + FAISS
# =========================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = FAISS.from_documents(chunks, embeddings)

retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

print("Retriever Ready")

# =========================
# PROMPT (for display only)
# =========================

prompt_template = """
Answer ONLY from context.
If not found, say: "I don't have that information."

Context:
{context}

Question:
{question}
"""

prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)

# =========================
# SIMPLE RAG LOOP
# =========================

def format_docs(docs):
    return "\n\n".join([d.page_content for d in docs])

while True:
    query = input("\nAsk Question (or exit): ")

    if query.lower() == "exit":
        break

    # FIXED LINE
    docs = retriever.invoke(query)

    context = format_docs(docs)

    final_answer = prompt.format(
        context=context,
        question=query
    )

    print("\n🤖 CONTEXT-BASED ANSWER:\n")
    print(final_answer)

    print("\n📌 SOURCES:")
    for doc in docs:
        print("-", doc.metadata["source"])