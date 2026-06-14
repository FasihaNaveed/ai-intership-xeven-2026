# =========================================
# Data Cleaning Pipeline
# Day 8 Practical
# =========================================

raw_data = [
    " Ali ",
    "SARA",
    None,
    "ali",
    "Fatima ",
    " sara ",
    "HAMZA",
    None,
    "hamza"
]

print("\nRAW DATA")
print(raw_data)


# Step 1 — Remove None

clean_data = [
    item
    for item in raw_data
    if item is not None
]


# Step 2 — Remove Spaces

clean_data = [
    item.strip()
    for item in clean_data
]

# List Comprehension
# Combine Step 2&3
# clean_data = [
#    item.strip().title()
#    for item in clean_data ]

# Step 3 — Normalize Case

clean_data = [
    item.title()
    for item in clean_data
]


# Step 4 — Remove Duplicates

clean_data = list(
    dict.fromkeys(clean_data)
)


# Metrics

original = len(raw_data)

clean = len(clean_data)

unique = len(set(clean_data))

completeness = (
    clean / original
) * 100


print("\nCLEAN DATA")
print(clean_data)

print("\n===== QUALITY REPORT =====")

print("Original Count:", original)

print("Clean Count:", clean)

print("Unique Count:", unique)

print(
    f"Completeness: {completeness:.2f}%"
)