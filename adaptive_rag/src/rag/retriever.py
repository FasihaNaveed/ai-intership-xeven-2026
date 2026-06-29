from langchain.tools import tool

from src.rag.loaders import DocumentLoader
from src.rag.splitter import TextSplitter
from src.rag.vectorstore import VectorStore

docs = DocumentLoader.load_document("data/sample.pdf")
chunks = TextSplitter.split_documents(docs)
vectorstore = VectorStore.create(chunks)

retriever = vectorstore.as_retriever()


@tool
def retriever_tool(query: str) -> str:
    """
    Search relevant information from uploaded documents.
    """

    documents = retriever.invoke(query)

    return "\n\n".join(
        [doc.page_content for doc in documents]
    )