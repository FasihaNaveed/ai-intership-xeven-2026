from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from rag_system.rag_core import RAGSystem
from rag_system.memory import ConversationMemory

app = FastAPI()

# Load once at startup
rag = RAGSystem()
memory = ConversationMemory()

# Request model
class Question(BaseModel):
    question: str

@app.on_event("startup")
def startup():

    print("Loading RAG system...")
    rag.build()
    print("RAG Ready")

# Health check
@app.get("/health")
def health():
    return {"status": "ok"}

# Ask endpoint
@app.post("/ask")
def ask(q: Question):

    try:
        query = q.question

        # get memory context
        chat_history = memory.get_context()

        # search docs
        results = rag.search(query)

        context = ""
        sources = []

        for doc, score in results:
            context += doc.page_content + "\n\n"
            sources.append(doc.metadata.get("source", "unknown"))

        # simple answer (no LLM to avoid errors)
        answer = f"Based on context:\n{context}\nUser asked: {query}"

        # save memory
        memory.add(query, answer)

        return {
            "answer": answer,
            "sources": list(set(sources)),
            "chat_history_used": chat_history
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))