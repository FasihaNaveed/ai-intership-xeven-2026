# Day 12: Functions Fundamentals

## Objectives

Today we learned:

* Function definition using `def`
* Parameters and arguments
* Return values and `None`
* Positional arguments
* Keyword arguments
* Default parameters
* Argument unpacking
* Local variables
* Global variables
* `global` keyword
* Function design principles
* Single Responsibility Principle
* Descriptive function names
* Docstrings

---

# Research Concepts

## 1. Function Definition

A function is a reusable block of code that performs a specific task.

Functions are defined using the `def` keyword.

Example:

```python
def greet():
    print("Hello World")
```

Calling the function:

```python
greet()
```

Output:

```
Hello World
```

Functions help reduce code duplication and improve readability.

---

## 2. Parameters and Return Values

Parameters allow functions to receive data.

Example:

```python
def greet(name):
    print(f"Hello {name}")
```

Calling:

```python
greet("Ali")
```

Output:

```
Hello Ali
```

### Return Values

Functions can return data using the `return` statement.

Example:

```python
def add(a, b):
    return a + b
```

Usage:

```python
result = add(5, 3)
print(result)
```

Output:

```
8
```

### None Return

If a function does not explicitly return a value, Python returns `None`.

Example:

```python
def test():
    pass

print(test())
```

Output:

```
None
```

---

## 3. Arguments

### Positional Arguments

Values are assigned according to their position.

Example:

```python
def introduce(name, age):
    print(name, age)

introduce("Ali", 20)
```

### Keyword Arguments

Arguments are passed using parameter names.

Example:

```python
introduce(age=20, name="Ali")
```

### Default Parameters

Default values are used when no argument is provided.

Example:

```python
def greet(name="Guest"):
    print(name)

greet()
```

Output:

```
Guest
```

### Argument Unpacking

The `*` operator unpacks values from a list or tuple.

Example:

```python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]

print(add(*numbers))
```

Output:

```
6
```

---

## 4. Scope

Scope determines where a variable can be accessed.

### Local Variables

Created inside a function and only available there.

Example:

```python
def demo():
    x = 10
    print(x)
```

### Global Variables

Defined outside functions and accessible throughout the program.

Example:

```python
x = 100

def demo():
    print(x)
```

### global Keyword

Used when modifying a global variable inside a function.

Example:

```python
count = 0

def increase():
    global count
    count += 1
```

---

## 5. Function Design Principles

### Single Responsibility Principle

A function should perform only one task.

Good Example:

```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)
```

### Descriptive Names

Function names should clearly describe their purpose.

Good Examples:

```python
calculate_average()
validate_email()
count_words()
```

Bad Examples:

```python
func1()
abc()
```

### Docstrings

Docstrings describe the purpose of a function.

Example:

```python
def greet(name):
    """
    Prints a greeting message.
    """
    print(name)
```

Docstrings improve code documentation and maintenance.

---

# Research Comparison

| Source         | Information                                            |
| -------------- | ------------------------------------------------------ |
| ChatGPT        | Explained functions with beginner-friendly examples    |
| Google Gemini  | Explained scope, arguments, and function behavior      |
| Claude AI      | Provided practical coding examples and best practices  |
| Medium Article | Explained function design and documentation techniques |

---

# References

1. ChatGPT

Date: June 15, 2026

2. Google Gemini

Date: June 15, 2026

3. Claude AI

Date: June 15, 2026

4. Medium Article

URL:
https://medium.com/@poundsmichaels/understanding-functions-in-python-a-complete-beginners-guide-ee857bc6e068

Date: June 15, 2026

---

# Clearest Explanation

ChatGPT and Claude provided the clearest explanations because they explained functions with simple examples and practical use cases.

---

# Summary

Functions are reusable blocks of code that improve organization and reduce repetition.

Parameters allow data to be passed into functions, while return statements send data back.

Different argument types provide flexibility when calling functions.

Scope controls variable accessibility.

Good function design includes single responsibility, descriptive names, and clear docstrings.
