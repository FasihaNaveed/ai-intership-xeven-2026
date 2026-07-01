import streamlit as st
import requests

BASE_URL = "http://127.0.0.1:8000"


def subjects_page():

    st.title("📚 Subjects")

    tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
        "Create",
        "Get",
        "Delete",
        "Student Count",
        "Instructor Count",
        "Update"
    ])

    with tab1:

        name = st.text_input("Subject Name")

        description = st.text_area("Description")

        if st.button("Create Subject"):

            response = requests.post(
                f"{BASE_URL}/subjects/",
                json={
                    "name": name,
                    "description": description
                }
            )

            st.json(response.json())

    with tab2:

        if st.button("Get Subjects"):

            response = requests.get(
                f"{BASE_URL}/subjects/"
            )

            st.json(response.json())

    with tab3:

        subject_id = st.number_input(
            "Subject ID",
            min_value=1
        )

        if st.button("Delete Subject"):

            response = requests.delete(
                f"{BASE_URL}/subjects/{subject_id}"
            )

            st.json(response.json())

    with tab4:

        sid = st.number_input(
            "Subject ID for Student Count",
            min_value=1,
            key="student"
        )

        if st.button("Student Count"):

            response = requests.post(
                f"{BASE_URL}/subjects/student-count",
                json={
                    "subject_id": sid
                }
            )

            st.json(response.json())

    with tab5:

        sid2 = st.number_input(
            "Subject ID for Instructor Count",
            min_value=1,
            key="ins"
        )

        if st.button("Instructor Count"):

            response = requests.post(
                f"{BASE_URL}/subjects/instructor-count",
                json={
                    "subject_id": sid2
                }
            )

            st.json(response.json())

    with tab6:

        uid = st.number_input(
            "Subject ID",
            min_value=1,
            key="update"
        )

        new_name = st.text_input("New Name")

        new_desc = st.text_area("New Description")

        if st.button("Update Subject"):

            response = requests.put(
                f"{BASE_URL}/subjects/{uid}",
                json={
                    "name": new_name,
                    "description": new_desc
                }
            )

            st.json(response.json())