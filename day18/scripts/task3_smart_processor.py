import os
import json

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter,
    MarkdownHeaderTextSplitter
)

# ---------- PATH SETUP ----------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------- DOCUMENT ----------
document = """
# AI Overview

Artificial Intelligence is growing fast.

## Machine Learning

Machine learning is part of AI.

## Deep Learning

Deep learning uses neural networks.

print("Hello World")

def test():
    pass
"""

# ---------- TYPE DETECTION ----------
def detect_type(text):

    if "#" in text:
        return "markdown"

    elif "def" in text or "print" in text:
        return "code"

    else:
        return "text"


doc_type = detect_type(document)

chunks = []

# ---------- SPLITTING ----------
if doc_type == "markdown":

    splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=[("#", "h1"), ("##", "h2")]
    )

    chunks = splitter.split_text(document)

else:

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=300 if doc_type == "code" else 500,
        chunk_overlap=20 if doc_type == "code" else 50
    )

    chunks = splitter.split_text(document)

# ---------- METADATA ----------
final_chunks = []

for i, chunk in enumerate(chunks):

    final_chunks.append({
        "chunk_id": i,
        "type": doc_type,
        "content": str(chunk),
        "length": len(str(chunk))
    })

# ---------- SAVE OUTPUT ----------
output_path = os.path.join(OUTPUT_DIR, "task3_chunks.json")

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(final_chunks, f, indent=4)

print("Task 3 completed")
print("Document type:", doc_type)
print("Chunks created:", len(final_chunks))
print("Saved at:", output_path)