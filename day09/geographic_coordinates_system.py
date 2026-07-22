# =========================================
# Day 09 - Geographic Coordinates System
# Tuples Practice
# =========================================

import math

# Fixed city coordinates stored in tuples
cities = [
    ("Lahore", 31.5204, 74.3587),
    ("Islamabad", 33.6844, 73.0479),
    ("Karachi", 24.8607, 67.0011),
    ("Peshawar", 34.0151, 71.5249)
]

# Function to calculate distance between two coordinates
def calculate_distance(coord1, coord2):
    lat1, lon1 = coord1
    lat2, lon2 = coord2

    return math.sqrt((lat2 - lat1)**2 + (lon2 - lon1)**2)

# Find closest city
def closest_city(user_location):
    closest = None
    min_distance = float("inf")

    for city, lat, lon in cities:
        distance = calculate_distance(user_location, (lat, lon))

        if distance < min_distance:
            min_distance = distance
            closest = city

    return closest, min_distance

# Example usage
user_location = (32.0, 74.0)

result = closest_city(user_location)

print("Closest City:", result)

# Tuple immutability demo
location = ("Lahore", 31.5, 74.3)

try:
    location[0] = "Karachi"
except TypeError as e:
    print("Immutability Error:", e)

# HaverSine Formula
# https://chatgpt.com/c/6a2e8421-ce38-83ee-b7b9-220b05bad38f