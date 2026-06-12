# =========================================
# Day 09 - Unique Visitor Tracker
# Sets Practice
# =========================================

day1_visitors = {
    "192.168.1.1",
    "192.168.1.2",
    "192.168.1.3",
    "192.168.1.4"
}

day2_visitors = {
    "192.168.1.3",
    "192.168.1.4",
    "192.168.1.5",
    "192.168.1.6"
}

# Common visitors (intersection)
common = day1_visitors.intersection(day2_visitors)

# Unique visitors day wise
unique_day1 = day1_visitors.difference(day2_visitors)
unique_day2 = day2_visitors.difference(day1_visitors)

# Total unique visitors (union)
total_unique = day1_visitors.union(day2_visitors)

# Growth rate
growth_rate = len(day2_visitors) - len(day1_visitors)

# Retention rate
retention_rate = len(common) / len(day1_visitors) * 100

print("Common Visitors:", common)
print("Unique Day 1:", unique_day1)
print("Unique Day 2:", unique_day2)
print("Total Unique Visitors:", total_unique)
print("Growth Rate:", growth_rate)
print("Retention Rate:", retention_rate, "%")