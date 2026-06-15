# Map + Lambda

from sample_data import text_list

cleaned = list(
    map(
        lambda x: x.strip().upper(),
        text_list
    )
)

print(cleaned)

#Filter Emails

from sample_data import mixed_data

emails = list(
    filter(
        lambda x: "@" in x,
        mixed_data
    )
)

print(emails)

# Filter Phone Numbers

phones = list(
    filter(
        lambda x: x.isdigit() and len(x)==11,
        mixed_data
    )
)

print(phones)

# Filter URLs

urls = list(
    filter(
        lambda x: x.startswith("http"),
        mixed_data
    )
)

print(urls)

#Sorted with Lambda

students = [
    {"name":"Ali","marks":80},
    {"name":"Ahmed","marks":95},
    {"name":"Sara","marks":90}
]

sorted_students = sorted(
    students,
    key=lambda x: x["marks"]
)

print(sorted_students)