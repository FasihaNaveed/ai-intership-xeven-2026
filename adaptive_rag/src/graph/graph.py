from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition

from src.graph.state import GraphState
from src.graph.nodes import (
    generate_query_or_respond,
    rewrite_question,
    generate_answer,
    grade_documents,
)
from src.rag.retriever import retriever_tool


workflow = StateGraph(GraphState)


# -------------------------
# Add Nodes
# -------------------------

workflow.add_node(
    "generate_query_or_respond",
    generate_query_or_respond,
)

workflow.add_node(
    "retrieve",
    ToolNode([retriever_tool]),
)

workflow.add_node(
    "rewrite_question",
    rewrite_question,
)

workflow.add_node(
    "generate_answer",
    generate_answer,
)


# -------------------------
# Start Edge
# -------------------------

workflow.add_edge(
    START,
    "generate_query_or_respond",
)


# -------------------------
# Decide Tool Call
# -------------------------

workflow.add_conditional_edges(
    "generate_query_or_respond",
    tools_condition,
    {
        "tools": "retrieve",
        END: END,
    },
)


# -------------------------
# Grade Retrieved Documents
# -------------------------

workflow.add_conditional_edges(
    "retrieve",
    grade_documents,
)


# -------------------------
# Final Edges
# -------------------------

workflow.add_edge(
    "generate_answer",
    END,
)

workflow.add_edge(
    "rewrite_question",
    "generate_query_or_respond",
)


# -------------------------
# Compile Graph
# -------------------------

graph = workflow.compile()