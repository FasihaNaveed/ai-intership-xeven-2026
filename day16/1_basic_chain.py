from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Step 1: Model (GROQ instead of OpenAI)
model = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

# Step 2: Prompt Template
prompt = ChatPromptTemplate.from_template(
    "Explain {topic} in simple words"
)

# Step 3: Output parser
parser = StrOutputParser()

# Step 4: LCEL Chain
chain = prompt | model | parser

# Run
result = chain.invoke({"topic": "Python"})
print(result)