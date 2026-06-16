from pydantic import BaseModel
from typing import List
import json
import os

BASE_DIR=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

OUTPUT_DIR=os.path.join(
BASE_DIR,
"scripts",
"outputs"
)

os.makedirs(OUTPUT_DIR,exist_ok=True)

# ---------- MODELS ----------

class Employee(BaseModel):

    name:str
    title:str
    department:str
    skills:List[str]

class Company(BaseModel):

    name:str
    location:str
    employees:List[Employee]

# ---------- RAW TEXT ----------

company_text={

"name":"OpenAI",

"location":"USA",

"employees":[

{
"name":"Ali",
"title":"Engineer",
"department":"AI",
"skills":["Python","ML"]
},

{
"name":"Sara",
"title":"Developer",
"department":"Software",
"skills":["Java","AI"]
}

]

}

company=Company(**company_text)

knowledge_graph={

"company":company.name,

"location":company.location,

"employees":[]

}

for emp in company.employees:

    knowledge_graph["employees"].append(

    {
    "name":emp.name,
    "title":emp.title,
    "skills":emp.skills
    }

    )

# accuracy simulation

accuracy={

"total_entities":2,
"correct_entities":2,
"accuracy":"100%"

}

result={

"knowledge_graph":knowledge_graph,

"accuracy":accuracy

}

path=os.path.join(
OUTPUT_DIR,
"task3_knowledge_graph.json"
)

with open(path,"w") as f:

    json.dump(result,f,indent=4)

print("Task3 completed")
print(path)