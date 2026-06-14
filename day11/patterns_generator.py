# Multiplication Table

for row in range(1, 11):

    for col in range(1, 11):
        print(row * col, end="\t")

    print()

#Pyramid Pattern

print("\nPyramid Pattern\n")

rows = 5

for i in range(1, rows + 1):
    print("*" * i)

#Number Triangle

print("\nNumber Triangle\n")

for i in range(1, 6):

    for j in range(1, i + 1):
        print(j, end=" ")

    print()

# Matrix Operations

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("\nMatrix")

for row in matrix:
    print(row)

# Sum Rows

print("\nRow Sums")

for row in matrix:
    print(sum(row))

# Diagonal Elements

print("\nDiagonal Elements")

for i in range(len(matrix)):
    print(matrix[i][i])

# ASCII Art Generator

print("\nASCII BOX\n")

for row in range(5):

    for col in range(10):
        print("#", end="")

    print()