import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"


def chatbot_page():

    st.title("🤖 AI Chatbot")

    st.markdown("### Upload a Document")

    uploaded_file = st.file_uploader(
        "Choose a PDF, DOCX or TXT file",
        type=["pdf", "docx", "txt"]
    )

    if uploaded_file is not None:

        if st.button("Upload Document"):

            files = {
                "file": (
                    uploaded_file.name,
                    uploaded_file.getvalue(),
                    uploaded_file.type
                )
            }

            response = requests.post(
                f"{API_URL}/chatbot/upload-document",
                files=files
            )

            if response.status_code == 200:

                st.success("✅ Document Uploaded Successfully")

                st.json(response.json())

            else:

                st.error(response.text)

    st.divider()

    st.markdown("### Ask a Question")

    question = st.text_area(
        "Enter your question"
    )

    if st.button("Get Answer"):

        if question.strip() == "":

            st.warning("Please enter a question.")

        else:

            response = requests.post(
                f"{API_URL}/chatbot/ask-question",
                json={
                    "question": question
                }
            )

            if response.status_code == 200:

                data = response.json()

                st.success("Answer")

                st.write(data["answer"])

            else:

                st.error(response.text)