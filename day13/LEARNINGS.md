# 📘 Day 13: Advanced Functions

## Objectives

Today learned:

* `*args` (variable positional arguments)
* `**kwargs` (variable keyword arguments)
* Lambda functions (anonymous functions)
* `map()` function
* `filter()` function
* `sorted()` with lambda
* List comprehensions
* Dictionary comprehensions
* Nested comprehensions
* Function performance comparison

---

# 🔬 Research Concepts

## 1. *args (Variable Arguments)

`*args` allows a function to take unlimited positional arguments.

Example:

```python
def add(*args):
    return sum(args)

print(add(1, 2, 3, 4))
```

Output:

```
10
```

👉 `args` becomes a tuple internally.

---

## 2. **kwargs (Keyword Arguments)

`**kwargs` allows a function to take unlimited named arguments.

Example:

```python
def user(**kwargs):
    print(kwargs)

user(name="Ali", age=20)
```

Output:

```
{'name': 'Ali', 'age': 20}
```

---

## 3. Lambda Functions

Lambda = anonymous (one-line function)

Example:

```python
square = lambda x: x * x
print(square(5))
```

Output:

```
25
```

---

## 4. map() Function

Applies a function to all items in a list.

Example:

```python
nums = [1, 2, 3]

result = list(map(lambda x: x * 2, nums))
print(result)
```

Output:

```
[2, 4, 6]
```

---

## 5. filter() Function

Filters data based on condition.

Example:

```python
nums = [1, 2, 3, 4, 5]

even = list(filter(lambda x: x % 2 == 0, nums))
print(even)
```

Output:

```
[2, 4]
```

---

## 6. sorted() with Lambda

Sorting with custom logic.

Example:

```python
students = [
    {"name": "Ali", "marks": 80},
    {"name": "Sara", "marks": 90}
]

sorted_data = sorted(students, key=lambda x: x["marks"])
print(sorted_data)
```

---

## 7. List Comprehension

Short way to create lists.

Example:

```python
nums = [1, 2, 3]

squares = [x * x for x in nums]
print(squares)
```

Output:

```
[1, 4, 9]
```

---

## 8. Dictionary Comprehension

Short way to create dictionaries.

Example:

```python
nums = [1, 2, 3]

result = {x: x * x for x in nums}
print(result)
```

Output:

```
{1: 1, 2: 4, 3: 9}
```

---

## 9. Nested Comprehension (Flatten List)

Example:

```python
nested = [[1, 2], [3, 4]]

flat = [item for sublist in nested for item in sublist]
print(flat)
```

Output:

```
[1, 2, 3, 4]
```

---

## 10. Dictionary Inversion

Example:

```python
data = {"a": 1, "b": 2}

inverse = {v: k for k, v in data.items()}
print(inverse)
```

Output:

```
{1: 'a', 2: 'b'}
```

---

## 11. Word Frequency Counter

Example:

```python
text = "python is easy and python is powerful"

words = text.split()

freq = {word: words.count(word) for word in set(words)}
print(freq)
```

Output:

```
{'python': 2, 'is': 2, 'easy': 1, 'and': 1, 'powerful': 1}
```

---

## 12. Performance Comparison

We compare:

* Lambda
* Regular function
* List comprehension

👉 Result:

```
List comprehension is usually fastest
Lambda + map is medium
Regular function depends on case
```

---

# 📊 Research Comparison

| Source      | Information Provided                     |
| ----------- | ---------------------------------------- |
| ChatGPT     | Explained concepts with simple examples  |
| Gemini      | Focused on syntax and structure          |
| Claude AI   | Provided real-world coding use cases     |
| Python Docs | Confirmed behavior of built-in functions |

---

# 📌 Summary

Advanced functions make Python more powerful and flexible.

Key improvements:

* `*args` → multiple values
* `**kwargs` → flexible arguments
* Lambda → short functions
* map/filter/sorted → data processing
* Comprehensions → fast & clean code