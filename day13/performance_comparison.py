import time

numbers = list(range(100000))

# Lambda
start = time.time()
result = list(map(lambda x: x*x, numbers))
end = time.time()
print("Lambda:", end - start)

# Regular Function
def square(x):
    return x*x

start = time.time()
result = list(map(square, numbers))
end = time.time()
print("Regular Function:", end - start)

# List Comprehension
start = time.time()
result = [x*x for x in numbers]
end = time.time()
print("List Comprehension:", end - start)