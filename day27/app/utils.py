import time
from collections import defaultdict

# Simple in-memory rate limiter
request_counts = defaultdict(list)

RATE_LIMIT = 5  # requests
TIME_WINDOW = 60  # seconds


def is_allowed(ip: str):

    now = time.time()

    # remove old requests
    request_counts[ip] = [
        t for t in request_counts[ip]
        if now - t < TIME_WINDOW
    ]

    if len(request_counts[ip]) >= RATE_LIMIT:
        return False

    request_counts[ip].append(now)
    return True