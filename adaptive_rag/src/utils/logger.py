import logging
import os


LOG_FOLDER = "logs"

if not os.path.exists(LOG_FOLDER):
    os.makedirs(LOG_FOLDER)


logger = logging.getLogger("adaptive_rag")
logger.setLevel(logging.INFO)


formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - %(message)s"
)


file_handler = logging.FileHandler("logs/app.log")
file_handler.setFormatter(formatter)


console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)


logger.addHandler(file_handler)
logger.addHandler(console_handler)