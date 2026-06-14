# Day 11: Loops & Iteration

## Objectives

Today we learned:

* For loops
* While loops
* range() function
* enumerate()
* zip()
* break statement
* continue statement
* else with loops
* Nested loops
* Matrix operations
* Prime numbers, factorial, and Fibonacci
* Number guessing game

---

# Research Concepts

## 1. For Loops

A for loop is used to iterate through a sequence such as a list, tuple, string, or range.

Example:

```python
for i in range(5):
    print(i)
```

Output:

```
0
1
2
3
4
```

For loops are commonly used for processing collections of data.

---

## 2. range(), enumerate(), and zip()

### range()

The `range()` function generates a sequence of numbers.

Example:

```python
range(5)
```

Produces:

```
0, 1, 2, 3, 4
```

### enumerate()

Returns both index and value during iteration.

Example:

```python
names = ["Ali", "Sara"]

for index, name in enumerate(names):
    print(index, name)
```

### zip()

Combines multiple sequences together.

Example:

```python
names = ["Ali", "Sara"]
marks = [80, 90]

for name, mark in zip(names, marks):
    print(name, mark)
```

---

## 3. While Loops

A while loop continues executing as long as its condition remains true.

Example:

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

While loops are useful when the number of iterations is not known beforehand.

---

## 4. Break, Continue, and Else

### break

Stops the loop immediately.

```python
for i in range(10):
    if i == 5:
        break
```

### continue

Skips the current iteration.

```python
for i in range(5):
    if i == 2:
        continue
```

### else with loops

Executes when the loop finishes normally.

```python
for i in range(3):
    print(i)
else:
    print("Finished")
```

---

## 5. Nested Loops

A nested loop is a loop inside another loop.

Example:

```python
for row in range(3):
    for col in range(3):
        print(row, col)
```

Nested loops are used for:

* Matrix operations
* Table generation
* Pattern printing
* 2D data processing

Time Complexity:

```
O(n²)
```

---

# Research Comparison

| Source         | Information                                         |
| -------------- | --------------------------------------------------- |
| ChatGPT        | Explained loops with beginner-friendly examples     |
| Google Gemini  | Explained loop control statements and optimization  |
| Claude AI      | Provided practical examples for real-world projects |
| Medium Article | Explained nested loops and iteration techniques     |

---

# References

1. ChatGPT

Date: June 14, 2026

2. Google Gemini

Date: June 14, 2026

3. Claude AI

Date: June 14, 2026

4. Medium Article

URL:
https://medium.com/data-science/python-basics-iteration-and-looping-6ca63b30835c

Date: June 14, 2026

---

# Clearest Explanation

ChatGPT and Claude provided the clearest explanations because they combined theory with practical coding examples that were easy to understand.

---

# Summary

Loops are used to repeat tasks efficiently.

For loops work with sequences, while while loops work with conditions.

Functions like range(), enumerate(), and zip() simplify iteration.

Break and continue control loop execution.

Nested loops help process matrices and patterns.

Loops are essential for data processing, automation, and problem-solving in Python.
