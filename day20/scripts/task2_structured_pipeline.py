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

# ---------- ARTICLE MODEL ----------

class Article(BaseModel):

    title:str
    author:str
    published_date:str
    summary:str
    tags:List[str]

articles_text=[

{
"title":"AI Future",
"author":"John",
"date":"2026",
"summary":"AI is growing",
"tags":["AI","ML"]
},

{
"title":"Python",
"author":"Sara",
"date":"2026",
"summary":"Python is popular",
"tags":["Python"]
}

]

dataset=[]

errors=[]

for item in articles_text:

    try:

        article=Article(

            title=item["title"],
            author=item["author"],
            published_date=item["date"],
            summary=item["summary"],
            tags=item["tags"]

        )

        dataset.append(
            article.model_dump()
        )

    except Exception as e:

        errors.append(str(e))

# save dataset

with open(
os.path.join(OUTPUT_DIR,"task2_articles_dataset.json"),
"w"
) as f:

    json.dump(dataset,f,indent=4)

with open(
os.path.join(OUTPUT_DIR,"task2_errors.json"),
"w"
) as f:

    json.dump(errors,f,indent=4)

print("Task2 completed")