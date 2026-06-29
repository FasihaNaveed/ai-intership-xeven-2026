import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000/rag/chat"

st.set_page_config(
    page_title="Adaptive RAG Chatbot",
    page_icon="🤖",
    layout="centered"
)

st.title("🤖 Adaptive RAG Chatbot")

st.write("Ask any question.")

question = st.text_input("Enter your question")

if st.button("Ask"):

    if question.strip() == "":
        st.warning("Please enter a question.")
    else:

        try:

            response = requests.post(
                API_URL,
                json={
                    "question": question
                }
            )

            if response.status_code == 200:

                data = response.json()

                st.success("Answer")

                st.write(data["answer"])

            else:

                st.error(f"Error {response.status_code}")

                st.write(response.text)

        except Exception as e:

            st.error(str(e))