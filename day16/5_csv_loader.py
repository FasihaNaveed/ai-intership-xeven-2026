from langchain_community.document_loaders import CSVLoader

loader = CSVLoader("sample.csv")
docs = loader.load()

print(docs[0])