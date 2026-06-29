import time
from src.core.logger import logger

async def log_requests(request, call_next):

    start = time.time()

    response = await call_next(request)

    duration = time.time() - start

    logger.info(
        f"{request.method} {request.url} "
        f"{response.status_code} "
        f"{duration:.2f}s"
    )

    return response