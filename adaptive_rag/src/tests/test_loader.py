from langchain_core.messages import HumanMessage

from src.graph.nodes import generate_query_or_respond

state = {
    "messages": [
        HumanMessage(
            content="What is RAG?"
        )
    ]
}

response = generate_query_or_respond(state)

print(response["messages"][0])