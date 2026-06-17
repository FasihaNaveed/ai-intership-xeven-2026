# Document Analyzer Architecture

## Components

1. Document Loader
   - Loads PDF and TXT files.

2. Chunking Module
   - Uses RecursiveCharacterTextSplitter.
   - Chunk Size: 500
   - Overlap: 50

3. Embedding Generator
   - all-MiniLM-L6-v2 model.

4. Vector Search
   - FAISS index for similarity search.

5. Entity Extraction
   - Groq + Pydantic.

6. Report Generator
   - Returns chunks, entities, and search results.

## Flow

Document
→ Loader
→ Chunker
→ Embeddings
→ FAISS
→ Semantic Search
→ Entity Extraction
→ Report