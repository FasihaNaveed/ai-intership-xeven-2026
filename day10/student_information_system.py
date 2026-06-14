import json

students = {}

# LOAD DATA FROM JSON
def load_data():

    global students

    try:

        file = open("students.json", "r")

        students = json.load(file)

        file.close()

        print("Data Loaded")

    except FileNotFoundError:

        print("No previous data found")

def add_student():

    student_id = input("Enter student id: ")

    students[student_id] = {

        "name": input("Enter name: "),

        "age": int(input("Enter age: ")),

        "grades": {}

    }

    print("Student Added")

def update_grade():

    student_id = input("Enter student id: ")

    subject = input("Subject: ")

    score = int(input("Score: "))

    students[student_id]["grades"][subject] = score

def get_student_average():

    student_id = input("Enter id: ")

    if student_id not in students:

        print("Student not found")
        return

    grades = students[student_id]["grades"]

    if len(grades) == 0:

        print("No grades available")
        return

    average = sum(grades.values()) / len(grades)

    print("Average:", average)

def find_top_student():

    top_student = ""

    highest = 0

    for student_id, data in students.items():

        if len(data["grades"]) == 0:
            continue

        average = sum(
            data["grades"].values()
        ) / len(data["grades"])

        if average > highest:

            highest = average

            top_student = data["name"]

    print(
        "Top Student:",
        top_student,
        "GPA:",
        highest
    )

# NEW FUNCTION
# Generate report sorted by GPA

def generate_report():

    report = []

    for student_id, data in students.items():

        if len(data["grades"]) == 0:

            gpa = 0

        else:

            gpa = sum(
                data["grades"].values()
            ) / len(data["grades"])

        report.append(
            {
                "id": student_id,
                "name": data["name"],
                "age": data["age"],
                "GPA": gpa
            }
        )

    # sorting highest GPA first

    report.sort(
        key=lambda x: x["GPA"],
        reverse=True
    )

# Python mein chhota anonymous function hota hai. Matlab aisa function jiska naam nahi hota aur usually ek hi line ka kaam karta hai.

    print("\n----- Student Report -----")

    for student in report:

        print(student)

def save_data():

    file = open(
        "students.json",
        "w"
    )

    json.dump(
        students,
        file,
        indent=4
    )

    file.close()

# LOAD OLD DATA FIRST

load_data()

while True:

    print("""
1 Add Student
2 Update Grade
3 Average
4 Top Student
5 Report
6 Save
""")

    choice=input("Choice: ")

    match choice:

        case "1":
            add_student()

        case "2":
            update_grade()

        case "3":
            get_student_average()

        case "4":
            find_top_student()

        case "5":
            generate_report()

        case "6":

            save_data()

            print("Data Saved")

            break

        case _:

            print("Invalid Choice")