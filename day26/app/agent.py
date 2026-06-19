from app.tools import (
    calculator_tool,
    web_search_tool,
    datetime_tool
)

from app.rag_tool import RAGTool


class SimpleAgent:

    def __init__(self):

        self.rag = RAGTool()

    def run(self, query: str):

        query_lower = query.lower()

        if any(
            op in query
            for op in ["+", "-", "*", "/"]
        ):

            return {
                "tool_used": "calculator",
                "result": calculator_tool(query)
            }

        elif "date" in query_lower:

            return {
                "tool_used": "datetime",
                "result": datetime_tool()
            }

        elif "document" in query_lower \
                or "rag" in query_lower \
                or "python" in query_lower \
                or "ai" in query_lower:

            return {
                "tool_used": "rag",
                "result": self.rag.search(query)
            }

        else:

            return {
                "tool_used": "web_search",
                "result": web_search_tool(query)
            }