try:
    # Take two numbers from the user and convert them to float
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))

    # Ask the user to select an operation
    operation = input("Enter operation (+, -, *, /, %, **): ")

    # Addition
    if operation == "+":
        result = num1 + num2
        print(f"{num1:.1f} + {num2:.1f} = {result:.1f}")

    # Subtraction
    elif operation == "-":
        result = num1 - num2
        print(f"{num1:.1f} - {num2:.1f} = {result:.1f}")

    # Multiplication
    elif operation == "*":
        result = num1 * num2
        print(f"{num1:.1f} * {num2:.1f} = {result:.1f}")

    # Division
    elif operation == "/":

        # Check division by zero
        if num2 == 0:
            print("Error: Cannot divide by zero.")
        else:
            result = num1 / num2
            print(f"{num1:.1f} / {num2:.1f} = {result:.2f}")

    # Modulus (remainder)
    elif operation == "%":

        # Check division by zero
        if num2 == 0:
            print("Error: Cannot perform modulus with zero.")
        else:
            result = num1 % num2
            print(f"{num1:.1f} % {num2:.1f} = {result:.1f}")

    # Exponentiation (power)
    elif operation == "**":
        result = num1 ** num2
        print(f"{num1:.1f} ** {num2:.1f} = {result:.1f}")

    # Handle invalid operation
    else:
        print("Error: Invalid operation selected.")

# Handle invalid numeric input
except ValueError:
    print("Error: Please enter valid numbers.")