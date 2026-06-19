from datetime import datetime


def calculator_tool(expression: str):

    try:
        result = eval(expression)
        return str(result)

    except Exception as e:
        return f"Error: {e}"


def web_search_tool(query: str):

    return f"Simulated web result for: {query}"


def datetime_tool():

    return datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
    )