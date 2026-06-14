import math


def calculate_average(numbers, precision=2):
    """
    Calculate the average of a list of numbers.

    Parameters:
        numbers (list): List of numeric values
        precision (int): Decimal places for rounding

    Returns:
        float: Average value
    """

    if not numbers:
        return "Error: List is empty"

    for num in numbers:
        if not isinstance(num, (int, float)):
            return "Error: Non-numeric value found"

    average = sum(numbers) / len(numbers)

    return round(average, precision)


def find_median(numbers):
    """
    Find the median value of a list.

    Parameters:
        numbers (list): List of numeric values

    Returns:
        float: Median value
    """

    if not numbers:
        return "Error: List is empty"

    for num in numbers:
        if not isinstance(num, (int, float)):
            return "Error: Non-numeric value found"

    numbers = sorted(numbers)
    n = len(numbers)

    if n % 2 == 0:
        return (numbers[n // 2 - 1] + numbers[n // 2]) / 2

    return numbers[n // 2]


def get_standard_deviation(numbers, precision=2):
    """
    Calculate standard deviation.

    Parameters:
        numbers (list): Numeric values
        precision (int): Decimal places

    Returns:
        float: Standard deviation
    """

    if not numbers:
        return "Error: List is empty"

    for num in numbers:
        if not isinstance(num, (int, float)):
            return "Error: Non-numeric value found"

    mean = sum(numbers) / len(numbers)

    variance = sum((x - mean) ** 2 for x in numbers) / len(numbers)

    std = math.sqrt(variance)

    return round(std, precision)


data = [10, 20, 30, 40, 50]

print("Average:", calculate_average(data))
print("Median:", find_median(data))
print("Standard Deviation:", get_standard_deviation(data))