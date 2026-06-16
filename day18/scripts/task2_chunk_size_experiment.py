from langchain_text_splitters import RecursiveCharacterTextSplitter
import os

# ---------- PATH SETUP ----------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------- TEXT ----------
text = """
Machine learning helps computers learn from data.
Artificial intelligence is a broad field.
Deep learning is part of machine learning.
Python is widely used in AI development.
Data science involves statistics and programming.
"""

chunk_sizes = [200, 500, 1000, 2000]

report = []

for size in chunk_sizes:

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=size,
        chunk_overlap=50
    )

    chunks = splitter.split_text(text)

    report.append(f"""
Chunk Size: {size}
Total Chunks: {len(chunks)}
Sample Chunk: {chunks[0] if chunks else 'N/A'}
""")

# ---------- SAVE OUTPUT ----------
output_path = os.path.join(OUTPUT_DIR, "task2_report.txt")

with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(report))

print("Task 2 completed - output saved at:", output_path)