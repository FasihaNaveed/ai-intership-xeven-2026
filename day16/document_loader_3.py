from langchain_community.document_loaders import TextLoader

loader = TextLoader("sample.txt")
docs = loader.load()

print(docs)
print("\nCONTENT:\n", docs[0].page_content)

#https://chatgpt.com/c/6a30dd39-32c0-83ee-8a36-0fb76383d131