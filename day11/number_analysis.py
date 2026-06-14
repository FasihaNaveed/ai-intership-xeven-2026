# Prime Numbers

n = 50

print("Prime Numbers:\n")

num = 2

while num <= n:

    is_prime = True

    divisor = 2

    while divisor * divisor <= num:

        if num % divisor == 0:
            is_prime = False
            break

        divisor += 1

    if is_prime:
        print(num)

    num += 1

# Factorial

print("\nFactorial\n")

number = 5

factorial = 1

while number > 0:
    factorial *= number
    number -= 1

print(factorial)

# Fibonacci Series

#Fibonacci sequence numbers ki ek series hoti hai jahan har naya number pichlay do numbers ka sum hota hai.

print("\nFibonacci\n")

a = 0
b = 1

count = 1

while count <= 10:
    print(a, end=" ")

    temp = a + b
    a = b
    b = temp

    count += 1

# Guessing Game

import random

secret = random.randint(1, 20)

attempts = 5

print("\nGuessing Game")

while attempts > 0:

    guess = int(input("\nEnter Number: "))

    if guess == secret:
        result = "correct"
    elif guess < secret:
        result = "low"
    else:
        result = "high"

    match result:
        case "correct":
            print("Correct!")
            break

        case "low":
            print("Too Low")

        case "high":
            print("Too High")

    attempts -= 1
    print("Attempts Left:", attempts)

else:
    print("Game Over")
    print("Secret Number:", secret)