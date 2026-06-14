import re
import string


def count_words(text):
    return len(text.split())


def extract_emails(text):
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+'
    return re.findall(pattern, text)


def remove_punctuation(text):
    return text.translate(
        str.maketrans('', '', string.punctuation)
    )


def title_case(text):
    return text.title()


def process_text(text, remove_punct=True, to_title=True):

    if remove_punct:
        text = remove_punctuation(text)

    if to_title:
        text = title_case(text)

    word_count = count_words(text)
    char_count = len(text)
    unique_words = len(set(text.split()))

    return word_count, char_count, unique_words


sample = """
hello world.
contact us at test@gmail.com
"""

print("Word Count:", count_words(sample))

print("Emails:", extract_emails(sample))

print("Without Punctuation:")
print(remove_punctuation(sample))

print("Title Case:")
print(title_case(sample))

result = process_text(sample)

print("Processed Result:", result)