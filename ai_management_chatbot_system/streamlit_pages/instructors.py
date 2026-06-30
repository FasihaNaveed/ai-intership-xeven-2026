import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"


def instructors_page():

    st.title("👨‍🏫 Instructor Management")

    menu = st.selectbox(
        "Select Operation",
        (
            "Create Instructor",
            "Get All Instructors",
            "Get Instructor By ID",
            "Assign User",
            "Assign Subject",
        )
    )

    # -----------------------------
    # CREATE INSTRUCTOR
    # -----------------------------

    if menu == "Create Instructor":

        st.subheader("Create Instructor")

        first_name = st.text_input("First Name")
        last_name = st.text_input("Last Name")
        email = st.text_input("Email")

        if st.button("Create Instructor"):

            payload = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email
            }

            response = requests.post(
                f"{API_URL}/instructors/",
                json=payload
            )

            if response.status_code == 200:
                st.success("Instructor Created Successfully")
                st.json(response.json())

            else:
                st.error(response.text)

    # -----------------------------
    # GET ALL
    # -----------------------------

    elif menu == "Get All Instructors":

        st.subheader("All Instructors")

        if st.button("Load Instructors"):

            response = requests.get(
                f"{API_URL}/instructors/"
            )

            if response.status_code == 200:

                st.table(response.json())

            else:

                st.error(response.text)

    # -----------------------------
    # GET BY ID
    # -----------------------------

    elif menu == "Get Instructor By ID":

        instructor_id = st.number_input(
            "Instructor ID",
            min_value=1,
            step=1
        )

        if st.button("Search"):

            response = requests.get(
                f"{API_URL}/instructors/{instructor_id}"
            )

            if response.status_code == 200:

                st.json(response.json())

            else:

                st.error(response.text)

    # -----------------------------
    # ASSIGN USER
    # -----------------------------

    elif menu == "Assign User":

        instructor_id = st.number_input(
            "Instructor ID",
            min_value=1,
            step=1,
            key="ins_user"
        )

        user_id = st.number_input(
            "User ID",
            min_value=1,
            step=1
        )

        if st.button("Assign User"):

            payload = {
                "user_id": user_id
            }

            response = requests.post(
                f"{API_URL}/instructors/{instructor_id}/assign-user",
                json=payload
            )

            if response.status_code == 200:

                st.success(response.json()["message"])

            else:

                st.error(response.text)

    # -----------------------------
    # ASSIGN SUBJECT
    # -----------------------------

    elif menu == "Assign Subject":

        instructor_id = st.number_input(
            "Instructor ID",
            min_value=1,
            step=1,
            key="ins_subject"
        )

        subject_id = st.number_input(
            "Subject ID",
            min_value=1,
            step=1
        )

        if st.button("Assign Subject"):

            payload = {
                "subject_id": subject_id
            }

            response = requests.post(
                f"{API_URL}/instructors/{instructor_id}/assign-subject",
                json=payload
            )

            if response.status_code == 200:

                st.success(response.json()["message"])

            else:

                st.error(response.text)