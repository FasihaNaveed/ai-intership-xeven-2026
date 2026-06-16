from langchain_text_splitters import CharacterTextSplitter, RecursiveCharacterTextSplitter
import os

# ---------- PATH SETUP ----------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------- SAMPLE TEXT ----------
text = """
Artificial Intelligence is transforming the world.
It is used in healthcare, finance, education, and transportation.
Machine learning is a subset of AI.
Deep learning uses neural networks with multiple layers.
Chunking helps in breaking long text into smaller pieces.
These chunks are used for embedding and retrieval systems.
"""

# ---------- FIXED SPLITTER ----------
fixed_splitter = CharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=0
)

fixed_chunks = fixed_splitter.split_text(text)

# ---------- RECURSIVE SPLITTER ----------
recursive_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

recursive_chunks = recursive_splitter.split_text(text)

# ---------- SAVE OUTPUT ----------
output_path = os.path.join(OUTPUT_DIR, "task1_output.txt")

with open(output_path, "w", encoding="utf-8") as f:

    f.write("FIXED CHUNKS:\n")
    for c in fixed_chunks:
        f.write(c + "\n---\n")

    f.write("\nRECURSIVE CHUNKS:\n")
    for c in recursive_chunks:
        f.write(c + "\n---\n")

print("Task 1 completed - output saved at:", output_path)