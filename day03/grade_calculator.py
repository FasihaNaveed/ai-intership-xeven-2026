"""
Grade Calculator using conditional statements
"""

try:
    grade = int(input("Enter your marks (0-100): "))

    if grade < 0 or grade > 100:
        print("Invalid marks!")
    elif grade >= 90:
        print("A - Excellent work!")
    elif grade >= 80:
        print("B - Good job!")
    elif grade >= 70:
        print("C - Satisfactory!")
    elif grade >= 60:
        print("D - Needs Improvement!")
    else:
        print("F - Fail, try again!")

except ValueError:
    print("Please enter valid numeric marks.")