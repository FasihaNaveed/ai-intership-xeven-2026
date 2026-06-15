from langchain_core.prompts import ChatPromptTemplate

template = ChatPromptTemplate.from_template(
    "You are a teacher. Explain {concept} with example."
)

prompt = template.invoke({"concept": "Loops in Python"})

print(prompt)