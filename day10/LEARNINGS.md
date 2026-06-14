# Day 10: Dictionaries & JSON

## Objectives

Today we learned:

- Python dictionaries
- Key-value pair structure
- Dictionary methods
- Nested dictionaries
- JSON file handling
- Dictionary comprehensions


---

# Research Concepts

## 1. Dictionaries

Dictionary is a mutable Python data structure that stores data in key-value pairs.

Example:

student = {
    "name": "Ali",
    "age": 20
}

Keys are used to access values.

Dictionary lookup is fast with average O(1) complexity.


---

## 2. Dictionary Methods

### get()

Returns value of a key safely.

Example:

student.get("name")


### keys()

Returns all dictionary keys.


### values()

Returns all dictionary values.


### items()

Returns key-value pairs.


### update()

Updates existing dictionary.


### pop()

Removes a specific key.


---

## 3. Nested Dictionaries

Nested dictionary means dictionary inside another dictionary.

Example:

students = {

101:{
"name":"Ali",
"grades":{
"Math":90
}

}

}


Used for storing complex data.


---

## 4. JSON

JSON stands for JavaScript Object Notation.

It is used to store and exchange data.

Python provides json module.

json.dump()
- Writes Python data into JSON file


json.load()
- Reads JSON file data


---

## 5. Dictionary Comprehension

Short method to create dictionaries.

Example:

squares = {
x:x*x
for x in range(5)
}


---

# Research Comparison


| Source | Information |
|---|---|
| ChatGPT | Explained dictionaries with beginner examples |
| Google Gemini | Explained technical details and O(1) lookup |
| Claude AI | Provided practical implementation approaches |
| Medium Article | Explained real-world dictionary usage |


---

# References


1. ChatGPT

Date: June 13 2026


2. Google Gemini

Date: June 13 2026


3. Claude AI

Date: June 13 2026


4. Medium Article

URL:
https://medium.com/

Date: June 13 2026


---

# Clearest Explanation

Claude examples were useful because they connected dictionary concepts with practical projects.


---

# Summary

Dictionaries store data using key-value pairs.

They are mutable and provide fast searching.

Nested dictionaries help manage structured data.

JSON allows saving Python data permanently.

Dictionary comprehension creates dictionaries in shorter syntax.