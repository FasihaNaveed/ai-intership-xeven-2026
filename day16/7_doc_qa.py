#https://chatgpt.com/c/6a30de8b-36ec-83e8-9e68-9af8a0af7ff6

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import TextLoader
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

# Load document
loader = TextLoader("sample.txt")
docs = loader.load()

text = docs[0].page_content

# GROQ Model
model = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

# Prompt
prompt = ChatPromptTemplate.from_template(
    """
    Answer the question based on this document:

    {document}

    Question: {question}
    """
)

parser = StrOutputParser()

chain = prompt | model | parser

result = chain.invoke({
    "document": text,
    "question": "What is LangChain?"
})

print(result)