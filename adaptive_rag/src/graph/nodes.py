from langchain_core.messages import HumanMessage

from src.services.llm_service import llm
from src.rag.retriever import retriever_tool

from typing import Literal

# ==========================
# Rewrite Prompt
# ==========================

REWRITE_PROMPT = """
Look at the input and try to reason about the underlying semantic intent.

Here is the initial question:

--------------------
{question}
--------------------

Formulate an improved question.
"""


# ==========================
# Answer Prompt
# ==========================

ANSWER_PROMPT = """
You are a helpful AI Assistant.

Answer the user's question ONLY using the retrieved context.

Question:
{question}

Context:
{context}
"""


# ===================================================
# Node 1
# Generate Query or Respond
# ===================================================

def generate_query_or_respond(state):

    response = (
        llm
        .bind_tools([retriever_tool])
        .invoke(state["messages"])
    )

    return {
        "messages": [response]
    }


# ===================================================
# Node 2
# Rewrite Question
# ===================================================

def rewrite_question(state):

    messages = state["messages"]

    question = messages[0].content

    prompt = REWRITE_PROMPT.format(
        question=question
    )

    response = llm.invoke(prompt)

    return {
        "messages": [
            HumanMessage(
                content=response.content
            )
        ]
    }


# ===================================================
# Node 3
# Generate Answer
# ===================================================

def generate_answer(state):

    question = state["messages"][0].content

    context = state["messages"][-1].content

    prompt = ANSWER_PROMPT.format(
        question=question,
        context=context
    )

    response = llm.invoke(prompt)

    return {
        "messages": [response]
    }


GRADE_PROMPT = """
You are a grader assessing whether the retrieved document is relevant to the user's question.

Question:
{question}

Context:
{context}

Reply with only:
yes
or
no
"""


def grade_documents(state) -> Literal["generate_answer", "rewrite_question"]:

    question = state["messages"][0].content

    context = state["messages"][-1].content

    prompt = GRADE_PROMPT.format(
        question=question,
        context=context
    )

    response = llm.invoke(prompt)

    score = response.content.strip().lower()

    if "yes" in score:
        return "generate_answer"

    return "rewrite_question"