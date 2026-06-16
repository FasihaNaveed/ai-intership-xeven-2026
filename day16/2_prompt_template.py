from langchain_core.prompts import ChatPromptTemplate

template = ChatPromptTemplate.from_template(
    "You are a teacher. Explain {concept} with example."
)

prompt = template.invoke({"concept": "Loops in Python"})

print(prompt)

#https://chatgpt.com/c/6a30dc63-1048-83e8-8e2a-4f896de99db0