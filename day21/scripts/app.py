import streamlit as st
from analyzer import DocumentAnalyzer
import tempfile

st.title("📄 Smart Document Analyzer (Day 21)")

uploaded_file = st.file_uploader(
    "Upload PDF or TXT",
    type=["pdf", "txt"]
)

if uploaded_file:

    with tempfile.NamedTemporaryFile(delete=False) as tmp:

        tmp.write(uploaded_file.read())
        tmp_path = tmp.name

    analyzer = DocumentAnalyzer(tmp_path)

    result = analyzer.run()

    st.subheader("📊 Analysis Results")

    st.write("Chunks:", result["chunks"])

    st.write("Top Results:")
    st.write(result["top_results"])

    st.write("Entities:")
    st.json(result["entities"])