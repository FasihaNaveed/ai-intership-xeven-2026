"""
Age Verification System with categories and error handling
"""

try:
    name = input("Enter your name: ")
    age = int(input("Enter your age: "))

    if age < 0:
        print("Invalid age!")
    elif age < 13:
        print(f"Hello {name}! You are a Child.")
    elif age < 18:
        print(f"Hello {name}! You are a Teenager.")
    elif age < 65:
        print(f"Hello {name}! You are an Adult.")
    else:
        print(f"Hello {name}! You are a Senior Citizen.")

except ValueError:
    print("Invalid input! Please enter numbers only.")