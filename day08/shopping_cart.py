# =========================================
# Shopping Cart System
# Day 8 Practical
# =========================================

items = []
prices = []
quantities = []


def add_item(name, price, quantity):

    items.append(name.title())
    prices.append(price)
    quantities.append(quantity)

    print(f"{name} added.")


def remove_item(name):

    if name.title() in items:

        index = items.index(name.title())

        items.pop(index)
        prices.pop(index)
        quantities.pop(index)

        print("Item removed")

    else:
        print("Item not found")


def update_quantity(name, quantity):

    if name.title() in items:

        index = items.index(name.title())

        quantities[index] = quantity

        print("Quantity updated")


def calculate_total():

    total = sum(
        prices[i] * quantities[i]
        for i in range(len(items))
    )

    if total > 100:
        total *= 0.90

    return total


def display_receipt():

    print("\n===== RECEIPT =====")

    for i in range(len(items)):

        subtotal = prices[i] * quantities[i]

        print(
            f"{items[i]} | "
            f"Qty:{quantities[i]} | "
            f"Price:${prices[i]} | "
            f"Subtotal:${subtotal}"
        )

    print("\nTotal:", round(calculate_total(), 2))

    print("\nRecently Added:")
    print(items[-3:])


# Sample Data

add_item("Mouse", 20, 2)
add_item("Keyboard", 40, 1)
add_item("Monitor", 120, 1)
add_item("USB", 10, 3)

update_quantity("USB", 5)

display_receipt()