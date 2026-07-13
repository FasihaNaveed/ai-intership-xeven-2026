from groq import Groq

from src.settings import settings


class Generator:

    def __init__(self):
        self.client = Groq(
            api_key=settings.GROQ_API_KEY
        )

    def generate_answer(
        self,
        question: str,
        context_documents: list[str]
    ):

        context = "\n\n".join(
            context_documents
        )

        prompt = f"""
You are an AI Company Knowledge Assistant.

Answer the user's question only using the provided company documents.

If the answer is not available in the provided documents, say:
"I could not find this information in the uploaded company documents."

Company Documents:
{context}

Question:
{question}

Answer:
"""

        response = self.client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
            max_tokens=500
        )

        return response.choices[0].message.content