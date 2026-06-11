students = ["Ali", "Sara", "Ahmed", "Zain", "Hina"]
grades = [85, 60, 45, 90, 70]

# Highest grade
max_grade = max(grades)
min_grade = min(grades)

print("Highest:", max_grade)
print("Lowest:", min_grade)

# Average
avg = sum(grades) / len(grades)
print("Average:", avg)

# Passed students
print("Passed Students:")
for i in range(len(students)):
    if grades[i] >= 50:
        print(students[i], grades[i])