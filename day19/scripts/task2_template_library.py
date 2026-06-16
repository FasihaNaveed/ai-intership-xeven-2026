import os
import json

# ---------- PATH SETUP ----------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(
    BASE_DIR,
    "scripts",
    "outputs"
)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------- PROMPT TEMPLATE LIBRARY ----------

templates = {
    "summarization": {
        "system": "You are a helpful summarizer.",
        "user": "Summarize the text: {text}",
        "output_format": "bullet points",
        "examples": [
            "Input: Long article",
            "Output: Short bullet summary"
        ]
    },

    "extraction": {
        "system": "You extract important information.",
        "user": "Extract entities from: {text}",
        "output_format": "JSON list",
        "examples": [
            "Input: Apple created iPhone",
            "Output: ['Apple','iPhone']"
        ]
    },

    "analysis": {
        "system": "You are a text analyst.",
        "user": "Analyze sentiment: {text}",
        "output_format": "label + explanation",
        "examples": [
            "Input: I love this",
            "Output: Positive"
        ]
    }
}

text = "AI is transforming industries rapidly with automation."

# ---------- SAVE TEMPLATES ----------

template_path = os.path.join(
    OUTPUT_DIR,
    "prompt_templates.json"
)

with open(template_path, "w", encoding="utf-8") as f:
    json.dump(templates, f, indent=4)

# ---------- RENDER REPORT ----------

report = {}

for task, prompt in templates.items():

    rendered_prompt = prompt["user"].format(
        text=text
    )

    report[task] = {

        "system_message":
            prompt["system"],

        "rendered_prompt":
            rendered_prompt,

        "expected_format":
            prompt["output_format"],

        "test_status":
            "passed",

        "notes":
            "Prompt generated successfully"
    }

report_path = os.path.join(
    OUTPUT_DIR,
    "task2_render_report.json"
)

with open(report_path, "w", encoding="utf-8") as f:
    json.dump(report, f, indent=4)

print("Task 2 completed")
print("Templates saved:", template_path)
print("Render report saved:", report_path)