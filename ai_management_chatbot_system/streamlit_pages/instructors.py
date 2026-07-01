import streamlit as st
import requests

BASE_URL = "http://127.0.0.1:8000"


def instructors_page():

    st.title("👨‍🏫 Instructors")

    tab1, tab2, tab3 = st.tabs([
        "Create",
        "Get",
        "Assign Subject"
    ])

    with tab1:

        first_name = st.text_input("First Name")

        last_name = st.text_input("Last Name")

        email = st.text_input("Email")

        if st.button("Create Instructor"):

            response = requests.post(
                f"{BASE_URL}/instructors/",
                json={
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email
                }
            )

            st.json(response.json())

    with tab2:

        if st.button("Get Instructors"):

            response = requests.get(
                f"{BASE_URL}/instructors/"
            )

            st.json(response.json())

    with tab3:

        instructor_id = st.number_input(
            "Instructor ID",
            min_value=1
        )

        subject_id = st.number_input(
            "Subject ID",
            min_value=1
        )

        if st.button("Assign Subject"):

            response = requests.post(
                f"{BASE_URL}/instructors/{instructor_id}/assign-subject",
                json={
                    "subject_id": subject_id
                }
            )

            st.json(response.json())