from document_loader import load_document
from chunker import create_chunks
from embeddings_index import VectorStore
from entity_extraction import extract_entities
import json
import os


class DocumentAnalyzer:

    def __init__(self, file_path):
        self.file_path = file_path

    def run(self):

        docs = load_document(self.file_path)

        if not docs:
            return {"chunks": 0, "entities": {}, "top_results": ""}

        chunks = create_chunks(docs)

        if not chunks:
            return {"chunks": 0, "entities": {}, "top_results": ""}

        store = VectorStore()
        store.build(chunks)

        results = store.search("What is this document about?", k=2)

        combined_text = "\n".join([r.page_content for r in results])

        try:
            entities = extract_entities(combined_text)
        except:
            entities = {}

        result = {
            "chunks": len(chunks),
            "entities": entities,
            "top_results": combined_text
        }

        os.makedirs("outputs", exist_ok=True)

        with open("outputs/analysis_report.json", "w") as f:
            json.dump(result, f, indent=4)

        return result


if __name__ == "__main__":

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    file = os.path.join(BASE_DIR, "data", "memo_cloud.txt")

    analyzer = DocumentAnalyzer(file)

    result = analyzer.run()

    print("\n===== ANALYSIS REPORT =====\n")
    print(json.dumps(result, indent=4))