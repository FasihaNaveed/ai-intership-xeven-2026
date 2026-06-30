import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"


def subjects_page():

    st.title("📚 Subject Management")

    menu = st.selectbox(
        "Select Operation",
        (
            "Create Subject",
            "Get All Subjects",
            "Get Subject By ID",
        )
    )

    # -----------------------------
    # CREATE SUBJECT
    # -----------------------------

    if menu == "Create Subject":

        st.subheader("Create Subject")

        name = st.text_input("Subject Name")

        if st.button("Create Subject"):

            payload = {
                "name": name
            }

            response = requests.post(
                f"{API_URL}/subjects/",
                json=payload
            )

            if response.status_code == 200:
                st.success("Subject Created Successfully")
                st.json(response.json())

            else:
                st.error(response.text)

    # -----------------------------
    # GET ALL SUBJECTS
    # -----------------------------

    elif menu == "Get All Subjects":

        st.subheader("All Subjects")

        if st.button("Load Subjects"):

            response = requests.get(
                f"{API_URL}/subjects/"
            )

            if response.status_code == 200:

                subjects = response.json()

                st.table(subjects)

            else:

                st.error(response.text)

    # -----------------------------
    # GET SUBJECT BY ID
    # -----------------------------

    elif menu == "Get Subject By ID":

        st.subheader("Search Subject")

        subject_id = st.number_input(
            "Subject ID",
            min_value=1,
            step=1
        )

        if st.button("Search Subject"):

            response = requests.get(
                f"{API_URL}/subjects/{subject_id}"
            )

            if response.status_code == 200:

                st.json(response.json())

            else:

                st.error(response.text)