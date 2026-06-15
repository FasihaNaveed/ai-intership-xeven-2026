#Flatten Nested List

nested = [[1, 2], [3, 4], [5, 6]]

flat = [item for sublist in nested for item in sublist]

print(flat)

#Matrix Transpose

matrix = [
    [1,2,3],
    [4,5,6]
]

transpose = [
    [row[i] for row in matrix]
    for i in range(len(matrix[0]))
]

print(transpose)

#Dictionary Inversion

original = {
    "a":1,
    "b":2,
    "c":3
}

inverted = {
    v:k
    for k,v in original.items()
}

print(inverted)

#Word Frequency Counter

text = "python is easy and python is powerful"

words = text.split()

frequency = {
    word: words.count(word)
    for word in set(words)
}

print(frequency)