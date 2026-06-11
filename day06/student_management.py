# Create list of students
students = ["Ali", "Sara", "Ahmed", "Zain", "Hina"]

# Add students
students.append("Usman")       # add at end
students.insert(2, "Bilal")     # add at position

print("After Adding:", students)

# Remove students
students.remove("Sara")         # remove by value
students.pop()                  # remove last

print("After Removing:", students)

# First 3 students
print("First 3 students:", students[:3])

# Sort list
students.sort()
print("Sorted list:", students)