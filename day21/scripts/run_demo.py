from analyzer import DocumentAnalyzer

analyzer = DocumentAnalyzer(
    "scripts/data/research_note.txt"
)

result = analyzer.run()

print(result)