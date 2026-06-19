from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text)
    answer = Column(Text)


# NEW: Thread support
class ChatThread(Base):
    __tablename__ = "threads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    thread_id = Column(Integer, ForeignKey("threads.id"))
    role = Column(String)   # user / assistant
    content = Column(Text)