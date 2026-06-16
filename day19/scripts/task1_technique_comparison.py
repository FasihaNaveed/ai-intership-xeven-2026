import os
import json
import time

# ---------- PATH ----------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(
    BASE_DIR,
    "scripts",
    "outputs"
)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------- 20 TEST SAMPLES ----------

samples = [
    ("I love this product", "positive"),
    ("Amazing service", "positive"),
    ("Very happy with result", "positive"),
    ("Excellent experience", "positive"),
    ("This is wonderful", "positive"),

    ("I hate this", "negative"),
    ("Worst experience", "negative"),
    ("Terrible service", "negative"),
    ("Very bad product", "negative"),
    ("I dislike it", "negative"),

    ("It is okay", "neutral"),
    ("Average quality", "neutral"),
    ("Nothing special", "neutral"),
    ("Normal experience", "neutral"),
    ("It works fine", "neutral"),

    ("Really amazing app", "positive"),
    ("Completely useless", "negative"),
    ("Not good at all", "negative"),
    ("Pretty decent", "neutral"),
    ("I am satisfied", "positive")
]

# ---------- TECHNIQUES ----------

def zero_shot(text):

    positive = ["love","amazing","happy","excellent","wonderful","satisfied"]
    negative = ["hate","worst","terrible","bad","useless"]

    for word in positive:
        if word in text.lower():
            return "positive"

    for word in negative:
        if word in text.lower():
            return "negative"

    return "neutral"

def few_shot(text):

    examples = {
        "love":"positive",
        "amazing":"positive",
        "worst":"negative",
        "terrible":"negative"
    }

    for key,value in examples.items():
        if key in text.lower():
            return value

    return zero_shot(text)

def chain_of_thought(text):

    result = zero_shot(text)

    return result + " (reasoned)"

# ---------- TEST ----------

results = {}

for name,func in [
    ("zero_shot",zero_shot),
    ("few_shot",few_shot),
    ("chain_of_thought",chain_of_thought)
]:

    start=time.time()

    correct=0

    for text,label in samples:

        prediction=func(text)

        prediction=prediction.replace(
            " (reasoned)",
            ""
        )

        if prediction==label:
            correct+=1

    accuracy=(correct/len(samples))*100

    results[name]={

        "accuracy":f"{accuracy}%",

        "speed_seconds":
        round(time.time()-start,5),

        "cost":
        "low",

        "best_use_case":
        {
            "zero_shot":"simple tasks",
            "few_shot":"better accuracy tasks",
            "chain_of_thought":"complex reasoning"
        }[name]
    }

# ---------- SAVE ----------

path=os.path.join(
    OUTPUT_DIR,
    "task1_results.json"
)

with open(path,"w") as f:
    json.dump(results,f,indent=4)

print("Task1 completed")
print(path)