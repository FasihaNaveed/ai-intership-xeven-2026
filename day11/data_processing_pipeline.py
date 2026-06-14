# Day 11 - Task 1

records = []

for i in range(1, 1001):
    records.append(i)

print("Processing Started...\n")

for index, record in enumerate(records, start=1):

    # Invalid records
    if record % 50 == 0:
        print(f"Record {record} skipped.")
        continue

    # Critical Error
    if record == 777:
        print("Critical Error Found!")
        break

    processed = record * 2

    print(
        f"Record #{index} of {len(records)} processed -> {processed}"
    )

print("\nProcessing Complete")

print("\nZip Example")

names = ["Ali", "Sara", "Ahmed"]
grades = [90, 85, 88]

for name, grade in zip(names, grades):
    print(name, grade)