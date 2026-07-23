"""
Migration script to add new columns to existing tables:
- documents.document_content (TEXT)
- chat_messages.conversation_id (INTEGER FK)
"""

import os
import sys
from pathlib import Path

# Ensure we can import from the project
sys.path.insert(0, str(Path(__file__).parent))

from sqlalchemy import create_engine, text

# Read .env file
env_path = Path(__file__).parent / ".env"
if not env_path.exists():
    print("ERROR: .env file not found!")
    sys.exit(1)

db_url = None
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line.startswith("DATABASE_URL"):
            db_url = line.split("=", 1)[1].strip()
            break

if not db_url:
    print("ERROR: DATABASE_URL not found in .env!")
    sys.exit(1)

# Convert async URL to sync URL for migration
sync_url = db_url.replace("+asyncpg", "").replace("postgresql+psycopg", "postgresql")
print(f"Connecting to: {sync_url[:60]}...")

engine = create_engine(sync_url)

with engine.connect() as conn:
    # 1. Add document_content to documents table
    print("Adding document_content column to documents table...")
    try:
        conn.execute(text("ALTER TABLE documents ADD COLUMN document_content TEXT"))
        print("  -> documents.document_content added successfully")
    except Exception as e:
        if "already exists" in str(e):
            print("  -> column already exists, skipping")
        else:
            print(f"  -> ERROR: {e}")

    # 2. Add conversation_id to chat_messages table
    print("Adding conversation_id column to chat_messages table...")
    try:
        conn.execute(text("ALTER TABLE chat_messages ADD COLUMN conversation_id INTEGER REFERENCES conversations(id)"))
        print("  -> chat_messages.conversation_id added successfully")
    except Exception as e:
        if "already exists" in str(e):
            print("  -> column already exists, skipping")
        else:
            print(f"  -> ERROR: {e}")

    conn.commit()

print("Migration completed successfully!")

