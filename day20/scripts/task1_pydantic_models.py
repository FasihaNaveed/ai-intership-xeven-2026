from pydantic import BaseModel, Field, EmailStr, ValidationError
from typing import List
import json
import os

# ---------- PATH ----------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE_DIR,"scripts","outputs")

os.makedirs(OUTPUT_DIR,exist_ok=True)

# ---------- MODELS ----------

class Person(BaseModel):

    name:str
    age:int = Field(gt=0)
    email:EmailStr
    hobbies:List[str]

class Product(BaseModel):

    id:int
    name:str
    price:float = Field(ge=0)
    in_stock:bool
    tags:List[str]

report={}

# ---------- VALID DATA ----------

try:

    person=Person(
        name="Ali",
        age=22,
        email="ali@gmail.com",
        hobbies=["coding","AI"]
    )

    report["person_valid"]="passed"

except Exception as e:
    report["person_valid"]=str(e)

# ---------- INVALID DATA ----------

try:

    Person(
        name="Test",
        age=-5,
        email="wrong",
        hobbies=[]
    )

except ValidationError as e:

    report["person_invalid"]="error captured"

try:

    product=Product(
        id=1,
        name="Laptop",
        price=1200.5,
        in_stock=True,
        tags=["tech"]
    )

    report["product_valid"]="passed"

except Exception as e:

    report["product_valid"]=str(e)

# ---------- SAVE ----------

path=os.path.join(
    OUTPUT_DIR,
    "task1_validation_report.json"
)

with open(path,"w") as f:
    json.dump(report,f,indent=4)

print("Task1 completed")
print(path)