from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import os
import psutil

from app.services.rag_core import RAGSystem
from app.memory import ConversationMemory

from app.models.schemas import QuestionRequest

app = FastAPI(title="Day 25 Production RAG")

rag = RAGSystem()
memory = ConversationMemory()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================= STARTUP =================
@app.on_event("startup")
def startup():
    print("Building RAG...")
    rag.build()
    print("RAG Ready")


# ================= HEALTH =================
@app.get("/health")
def health():

    return {
        "status": "ok",
        "docs_count": len(rag.chunks),
        "memory_size": len(memory.history),
        "ram_usage_mb": psutil.virtual_memory().used // (1024 * 1024)
    }


# ================= ASK =================
@app.post("/ask")
def ask(req: QuestionRequest):

    try:
        query = req.question

        chat_history = memory.get_context()

        results = rag.search(query)

        context = ""
        sources = []

        for doc in results:
            context += doc.page_content + "\n\n"
            sources.append(doc.metadata.get("source", "unknown"))

        answer = f"""
Based on context:
{context}

Question: {query}
"""

        memory.add(query, answer)

        return {
            "answer": answer,
            "sources": list(set(sources)),
            "chat_history": chat_history
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ================= SEARCH ONLY =================
@app.post("/search")
def search(req: QuestionRequest):

    try:
        results = rag.hybrid.search(req.question)

        return {
            "chunks": [
                {
                    "text": doc.page_content,
                    "source": doc.metadata.get("source", "unknown")
                }
                for doc in results
            ]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ================= UPLOAD =================
@app.post("/documents/upload")
async def upload(file: UploadFile = File(...)):

    try:
        content = await file.read()
        text = content.decode("utf-8")

        os.makedirs("data", exist_ok=True)

        file_path = f"data/{file.filename}"

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(text)

        rag.add_document(text)

        return {
            "message": "File uploaded & indexed",
            "filename": file.filename
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ================= DELETE =================
@app.delete("/documents/{filename}")
def delete_document(filename: str):

    try:
        path = f"data/{filename}"

        if os.path.exists(path):
            os.remove(path)

            rag.build()

            return {"message": f"{filename} deleted"}

        return {"message": "File not found"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ================= LIST DOCS =================
@app.get("/documents")
def list_docs():

    files = os.listdir("data")

    return {
        "documents": files
    }