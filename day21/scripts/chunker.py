from langchain_text_splitters import RecursiveCharacterTextSplitter

def create_chunks(documents):

    print("DEBUG: Incoming docs =", len(documents))

    if not documents:
        return []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(documents)

    print("DEBUG: Chunks created =", len(chunks))

    return chunks