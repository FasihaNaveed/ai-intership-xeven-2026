import json

def load_config():

    try:

        with open("config.json","r") as file:

            config=json.load(file)

            return config

    except FileNotFoundError:

        print("File not found")

        return {}

def validate_config(config):

    required=[
        "database",
        "api_key"
    ]

    for key in required:

        if key not in config:

            print(
            key,
            "missing"
            )

config=load_config()

validate_config(config)

print(
config.get(
"database",
"default"
)
)