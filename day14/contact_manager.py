# Start Code
import json

contacts = {}

# Add Contact
def add_contact(id, name, phone, email, tags=None, notes=None):

    contacts[id] = {
        "name": name,
        "phone": phone,
        "email": email,
        "tags": set(tags) if tags else set(),
        "notes": list(notes) if notes else []
    }

    print("Contact added successfully")


# Search Contact (name / partial)
def search_contacts(keyword):

    result = {
        id: data
        for id, data in contacts.items()
        if keyword.lower() in data.get("name", "").lower()
    }

    return result

#Update Contact

def update_contact(id, **kwargs):

    if id in contacts:

        for key, value in kwargs.items():
            if key in contacts[id]:
                contacts[id][key] = value

        print("Updated successfully")

    else:
        print("Contact not found")

#Delete Contact

def delete_contact(id):

    if id in contacts:
        del contacts[id]
        print("Deleted")
    else:
        print("Not found")

#Add Tag

def add_tag(id, tag):

    contacts[id]["tags"].add(tag)

#Remove Tag

def remove_tag(id, tag):

    contacts[id]["tags"].discard(tag)

#Find by Tag

def find_by_tag(tag):

    return {
        id: data
        for id, data in contacts.items()
        if tag in data["tags"]
    }

#Statistics

def stats():

    total = len(contacts)

    tag_count = {}

    for data in contacts.values():
        for tag in data["tags"]:
            tag_count[tag] = tag_count.get(tag, 0) + 1

    most_used = max(tag_count, key=tag_count.get) if tag_count else None

    print("Total Contacts:", total)
    print("Most Used Tag:", most_used)

#Save to JSON

def save():

    with open("contacts.json", "w") as f:
        json.dump(contacts, f, default=list)

    print("Saved successfully")

#Load from JSON

def load():

    global contacts

    try:
        with open("contacts.json", "r") as f:
            contacts = json.load(f)

        # convert tags back to set
        for id in contacts:
            contacts[id]["tags"] = set(contacts[id]["tags"])

        print("Loaded successfully")

    except FileNotFoundError:
        print("No file found")

#CLI Menu

while True:

    print("\n--- CONTACT MANAGER ---")
    print("1. Add Contact")
    print("2. Search Contact")
    print("3. Delete Contact")
    print("4. Show Stats")
    print("5. Save")
    print("6. Load")
    print("0. Exit")

    choice = input("Enter choice: ")

    if choice == "1":
        add_contact(1, "Ali", "0300", "ali@gmail.com", ["friend"], ["note"])

    elif choice == "2":
        print(search_contacts("Ali"))

    elif choice == "3":
        delete_contact(1)

    elif choice == "4":
        stats()

    elif choice == "5":
        save()

    elif choice == "6":
        load()

    elif choice == "0":
        break