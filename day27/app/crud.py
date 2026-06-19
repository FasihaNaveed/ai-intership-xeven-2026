from sqlalchemy.orm import Session
from app.models import Document, Conversation


# Documents
def create_document(db: Session, title: str, content: str):
    doc = Document(title=title, content=content)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


def get_documents(db: Session):
    return db.query(Document).all()


# Conversations
def save_conversation(db: Session, question: str, answer: str):
    conv = Conversation(question=question, answer=answer)
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return conv


def get_conversations(db: Session):
    return db.query(Conversation).all()


def get_stats(db: Session):
    return {
        "documents": db.query(Document).count(),
        "conversations": db.query(Conversation).count()
    }