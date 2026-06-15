# Day 14 - Data Structures Cheat Sheet

## 1. List
- Ordered
- Mutable
- Allows duplicates

Use case: storing collection of items

Example:
```python
nums = [1, 2, 3]

Time Complexity:

Access: O(1)
Search: O(n)
Insert: O(n)
Delete: O(n)
2. Tuple
Ordered
Immutable
Faster than list

Use case: fixed data (coordinates, config)

Example:

point = (10, 20)

Time Complexity:

Access: O(1)
Search: O(n)
3. Set
Unordered
No duplicates
Fast membership testing

Use case: unique items

Example:

s = {1, 2, 3}

Time Complexity:

Search: O(1)
Insert: O(1)
4. Dictionary
Key-value pairs
Mutable
Fast lookup

Use case: structured data

Example:

user = {"name": "Ali", "age": 20}

Time Complexity:

Access: O(1)
Insert: O(1)
Delete: O(1)

---