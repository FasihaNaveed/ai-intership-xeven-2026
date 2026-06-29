from langchain_core.prompts import ChatPromptTemplate

grade_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are a grader.

Determine whether the retrieved document is relevant to the user's question.

Reply only with:
yes
or
no
            """,
        ),
        (
            "human",
            """
Question:
{question}

Document:
{document}
            """,
        ),
    ]
)