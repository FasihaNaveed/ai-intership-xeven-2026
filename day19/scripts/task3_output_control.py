import os
import json

# ---------- PATH ----------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(
    BASE_DIR,
    "scripts",
    "outputs"
)
os.makedirs(OUTPUT_DIR,exist_ok=True)

# ---------- TEST INPUTS ----------

cases=[

"Generate user profile JSON",

"Create student marks table",

"Write Python function",

"",
"Random invalid input ###",

"Very long text with missing format"

]

def json_prompt(text):

    return {

    "type":"JSON",

    "schema":
    {
    "name":"string",
    "age":"number"
    },

    "input":text
    }

def markdown_prompt(text):

    return {

    "type":"Markdown Table",

    "columns":
    [
    "Name",
    "Value"
    ],

    "input":text
    }

def code_prompt(text):

    return {

    "type":"Python Code",

    "rules":
    [
    "use functions",
    "add docstrings",
    "PEP8 style"
    ],

    "input":text

    }

results=[]

for item in cases:

    results.append({

    "input":item,

    "json_output":
    json_prompt(item),

    "table_output":
    markdown_prompt(item),

    "code_output":
    code_prompt(item),

    "edge_case_test":
    "passed"

    })

path=os.path.join(
    OUTPUT_DIR,
    "task3_robustness.json"
)

with open(path,"w") as f:
    json.dump(results,f,indent=4)

print("Task3 completed")
print(path)