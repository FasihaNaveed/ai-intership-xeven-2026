"""
Basic interactive calculator with error handling
"""

try:
    first_number = float(input("Enter first number: "))
    second_number = float(input("Enter second number: "))

    print("Sum:", first_number + second_number)
    print("Difference:", first_number - second_number)
    print("Product:", first_number * second_number)
    print("Quotient:", first_number / second_number)

except ValueError:
    print("Invalid input! Please enter numbers only.")

except ZeroDivisionError:
    print("Cannot divide by zero!")