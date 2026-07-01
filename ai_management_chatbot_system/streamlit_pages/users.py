import streamlit as st
import requests

BASE_URL = "http://127.0.0.1:8000"


def users_page():

    st.title("👤 Users")

    tab1, tab2, tab3, tab4, tab5 = st.tabs([
        "Create",
        "Get All",
        "Get One",
        "Delete",
        "Assign"
    ])

    with tab1:

        st.subheader("Create User")

        first_name = st.text_input("First Name")
        last_name = st.text_input("Last Name")
        email = st.text_input("Email")
        password = st.text_input("Password", type="password")

        if st.button("Create User"):

            response = requests.post(
                f"{BASE_URL}/users/",
                json={
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email,
                    "password": password
                }
            )

            st.json(response.json())

    with tab2:

        if st.button("Get All Users"):

            response = requests.get(f"{BASE_URL}/users/")
            st.json(response.json())

    with tab3:

        user_id = st.number_input("User ID", min_value=1)

        if st.button("Get User"):

            response = requests.get(
                f"{BASE_URL}/users/{user_id}"
            )

            st.json(response.json())

    with tab4:

        delete_id = st.number_input(
            "Delete User ID",
            min_value=1
        )

        if st.button("Delete User"):

            response = requests.delete(
                f"{BASE_URL}/users/{delete_id}"
            )

            st.json(response.json())

    with tab5:

        st.subheader("Assign Subject")

        uid = st.number_input(
            "User ID",
            min_value=1,
            key="uid"
        )

        sid = st.number_input(
            "Subject ID",
            min_value=1,
            key="sid"
        )

        if st.button("Assign Subject"):

            response = requests.post(
                f"{BASE_URL}/users/{uid}/assign-subject",
                json={
                    "subject_id": sid
                }
            )

            st.json(response.json())

        st.subheader("Assign Instructor")

        iid = st.number_input(
            "Instructor ID",
            min_value=1
        )

        if st.button("Assign Instructor"):

            response = requests.post(
                f"{BASE_URL}/users/{uid}/assign-instructor",
                json={
                    "instructor_id": iid
                }
            )

            st.json(response.json())