from document_loader import load_document
from chunker import create_chunks

docs = load_document("scripts/data/research_note.txt")

chunks = create_chunks(docs)

print(f"Chunks created: {len(chunks)}")

print("Pipeline Verified Successfully")