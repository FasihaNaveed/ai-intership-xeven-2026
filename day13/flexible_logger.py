from datetime import datetime


def log(level, *messages, **options):

    # Default options
    timestamp = options.get("timestamp", True)
    file_name = options.get("file", "log.txt")
    format_type = options.get("format", "text")

    # Sare messages ko aik string mein convert karna
    message = " ".join(messages)

    # Timestamp add karna
    if timestamp:
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        output = f"[{current_time}] {level}: {message}"
    else:
        output = f"{level}: {message}"

    # Match Case
    match level:
        case "ERROR":
            print(f"🔴 {output}")

        case "WARNING":
            print(f"🟡 {output}")

        case "INFO":
            print(f"ℹ️ {output}")

        case _:
            print(output)

    # File mein save karna
    with open(file_name, "a") as file:
        file.write(output + "\n")


# Testing
log("INFO", "Application Started")

log("WARNING", "Low Disk Space")

log("ERROR", "Database Connection Failed")

log(
    "INFO",
    "User Logged In",
    timestamp=False
)