import json

inventory = {}

def add_product():

    pid = input("Product id: ")

    inventory[pid] = {

        "name": input("Name: "),

        "price": float(input("Price: ")),

        "quantity": int(input("Quantity: ")),

        "category": input("Category: ")

    }

    print("Product Added")

def update_stock():

    pid = input("Product id: ")

    quantity = int(input("New quantity: "))

    inventory[pid]["quantity"] = quantity

    print("Stock Updated")

def search_by_category():

    category = input("Category: ")

    found = False

    for product in inventory.values():

        if product["category"] == category:

            print(product)

            found = True

    if not found:

        print("No product found")

def low_stock_alert():

    for product in inventory.values():

        if product["quantity"] < 5:

            print(
                "Low Stock:",
                product
            )

def total_value():

    total = 0

    for item in inventory.values():

        total += (
            item["price"]
            *
            item["quantity"]
        )

    print(
        "Total Inventory Value:",
        total
    )

# NEW FUNCTION
# Average price per category

def average_price_category():

    categories = {}

    for product in inventory.values():

        category = product["category"]

        if category not in categories:

            categories[category] = {

                "total_price":0,

                "count":0
            }

        categories[category]["total_price"] += product["price"]

        categories[category]["count"] += 1

    for category,data in categories.items():

        average = (
            data["total_price"]
            /
            data["count"]
        )

        print(
            category,
            "Average Price:",
            average
        )

def export_json():

    with open(
        "inventory.json",
        "w"
    ) as file:

        json.dump(
            inventory,
            file,
            indent=4
        )


    print("Inventory Saved")

# Testing

add_product()

add_product()

update_stock()

search_by_category()

low_stock_alert()

total_value()

average_price_category()

export_json()