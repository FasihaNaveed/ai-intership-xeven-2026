# =========================================
# Student Grade Manager
# Day 8 Practical
# =========================================

student_names = []
student_grades = []


# Add Student
def add_student(name, grade):
    student_names.append(name.title())
    student_grades.append(grade)
    print(f"{name} added successfully.")


# Remove Student
def remove_student(name):
    if name.title() in student_names:
        index = student_names.index(name.title())

        student_names.pop(index)
        student_grades.pop(index)

        print(f"{name} removed.")
    else:
        print("Student not found.")


# Update Grade
def update_grade(name, new_grade):
    if name.title() in student_names:

        index = student_names.index(name.title())
        student_grades[index] = new_grade

        print("Grade updated.")
    else:
        print("Student not found.")


# Calculate Average
def get_average():
    return sum(student_grades) / len(student_grades)


# Display Results
def display_statistics():

    highest = max(student_grades)
    lowest = min(student_grades)

    highest_student = student_names[student_grades.index(highest)]
    lowest_student = student_names[student_grades.index(lowest)]

    print("\n===== REPORT =====")

    print(f"Average Grade: {get_average():.2f}")
    print(f"Highest: {highest_student} ({highest})")
    print(f"Lowest: {lowest_student} ({lowest})")

    sorted_students = sorted(
        zip(student_names, student_grades),
        key=lambda x: x[1],
        reverse=True
    )

    print("\nTop 3 Performers")

    for student in sorted_students[:3]:
        print(student)

    average = get_average()

    above_avg = [
        student_names[i]
        for i in range(len(student_grades))
        if student_grades[i] > average
    ]

    below_avg = [
        student_names[i]
        for i in range(len(student_grades))
        if student_grades[i] < average
    ]

    print("\nAbove Average:", above_avg)
    print("Below Average:", below_avg)


# Sample Data
add_student("Ali", 88)
add_student("Sara", 94)
add_student("Ahmed", 79)
add_student("Fatima", 98)
add_student("Hamza", 84)

update_grade("Ahmed", 90)

display_statistics()