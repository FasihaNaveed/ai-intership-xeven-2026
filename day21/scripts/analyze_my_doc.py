from analyzer import DocumentAnalyzer

path = input("Enter file path: ")

result = DocumentAnalyzer(path).run()

print(result)