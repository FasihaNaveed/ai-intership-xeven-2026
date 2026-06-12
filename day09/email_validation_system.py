# =========================================
# Day 09 - Email Validation System
# Sets + String Handling
# =========================================

valid_domains = {
    "gmail.com",
    "yahoo.com",
    "outlook.com"
}

registered_emails = set()

# Email validation function
def validate_email(email):
    if "@" not in email:
        return False

    username, domain = email.split("@")

    if domain not in valid_domains:
        return False

    if len(username) < 2:
        return False

    return True


emails = [
    "ali@gmail.com",
    "sara@yahoo.com",
    "test@invalid.com",
    "noatsymbol.com",
    "ali@gmail.com"  # duplicate
]

for email in emails:
    if validate_email(email):
        registered_emails.add(email)

print("Registered Emails:", registered_emails)

# Filter Gmail users
gmail_users = {
    email for email in registered_emails
    if email.endswith("gmail.com")
}

print("Gmail Users:", gmail_users)