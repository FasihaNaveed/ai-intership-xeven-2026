from pydantic import BaseModel
from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

class EntityOutput(BaseModel):

    names: list[str]
    organizations: list[str]
    locations: list[str]

def extract_entities(text):

    prompt = f"""

Extract entities from this text.

Return ONLY valid JSON.
No explanation.

Format:

{{
 "names": [],
 "organizations": [],
 "locations": []
}}

Text:

{text}

"""

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    result = response.choices[0].message.content

    print("\nRAW RESPONSE:")
    print(result)

    try:

        return json.loads(result)

    except Exception:

        print("\n⚠️ JSON parsing failed")

        return {
            "names": [],
            "organizations": [],
            "locations": []
        }

# =========================
# TEST RUN
# =========================

if __name__ == "__main__":

    sample_text = """
    Elon Musk founded SpaceX.
    SpaceX is located in California.
    OpenAI works on artificial intelligence.
    """

    print("\nExtracting entities...\n")

    entities = extract_entities(sample_text)

    print("\n========== RESULTS ==========\n")

    print("Names:")
    print(entities["names"])

    print("\nOrganizations:")
    print(entities["organizations"])

    print("\nLocations:")
    print(entities["locations"])