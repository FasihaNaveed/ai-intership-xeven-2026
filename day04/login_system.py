# Take input from user
username = input("Enter username: ")
password = input("Enter password: ")
age = int(input("Enter age: "))

# Check if username length is less than 5 characters
if len(username) < 5:
    print("Error: Username must be at least 5 characters long.")

# Check if password length is less than 8 characters
if len(password) < 8:
    print("Error: Password must be at least 8 characters long.")

# Check if age is less than 18
if age < 18:
    print("Error: Age must be 18 or above.")

# Grant access only if ALL conditions are true
if (
    len(username) >= 5
    and len(password) >= 8
    and age >= 18
):
    print("Access Granted")
else:
    print("Access Denied")