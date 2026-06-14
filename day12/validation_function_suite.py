import re
from datetime import datetime


def validate_email(email):

    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'

    if re.match(pattern, email):
        return True, "Valid Email"

    return False, "Invalid Email Format"


def validate_phone(phone):

    pattern = r'^\d{11}$'

    if re.match(pattern, phone):
        return True, "Valid Phone"

    return False, "Phone must contain 11 digits"


def validate_date(date_text):

    try:
        datetime.strptime(date_text, "%Y-%m-%d")
        return True, "Valid Date"

    except ValueError:
        return False, "Date format should be YYYY-MM-DD"


def validate_password(password):

    if len(password) < 8:
        return False, "Password must be at least 8 characters"

    if not any(char.isdigit() for char in password):
        return False, "Password must contain a number"

    if not any(char.isupper() for char in password):
        return False, "Password must contain an uppercase letter"

    return True, "Valid Password"


def validate_user_input(input_type, value):

    validators = {
        "email": validate_email,
        "phone": validate_phone,
        "date": validate_date,
        "password": validate_password
    }

    validator = validators.get(input_type)

    if validator:
        return validator(value)

    return False, "Unknown Validation Type"


# ================= TESTING =================

print(validate_user_input(
    "email",
    "test@gmail.com"
))

print(validate_user_input(
    "phone",
    "03001234567"
))

print(validate_user_input(
    "date",
    "2026-06-15"
))

print(validate_user_input(
    "password",
    "Password123"
))