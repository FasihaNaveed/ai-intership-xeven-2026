import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"


def chatbot_page():

    st.title("🤖 AI Chatbot")

    st.subheader("📄 Upload Document")

    uploaded_file = st.file_uploader(
        "Choose PDF, DOCX or TXT",
        type=["pdf", "docx", "txt"]
    )

    if uploaded_file is not None:

        if st.button("Upload Document"):

            files = {
                "file": (
                    uploaded_file.name,
                    uploaded_file.getvalue(),
                    uploaded_file.type,
                )
            }

            response = requests.post(
                f"{API_URL}/chatbot/upload",
                files=files,
            )

            if response.status_code == 200:
                st.success("✅ Document uploaded successfully")
                st.json(response.json())
            else:
                st.error(response.text)

    st.divider()

    st.subheader("💬 Ask Question")

    question = st.text_area("Enter your question")

    if st.button("Ask"):

        if question.strip() == "":
            st.warning("Please enter a question.")

        else:

            response = requests.post(
                f"{API_URL}/chatbot/ask",
                data={
                    "question": question
                },
            )

            if response.status_code == 200:
                st.success("Answer")
                st.write(response.json()["answer"])
            else:
                st.error(response.text)