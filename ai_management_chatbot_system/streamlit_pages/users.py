import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"


def users_page():

    st.title("👤 User Management")

    menu = st.selectbox(
        "Select Operation",
        (
            "Create User",
            "Get All Users",
            "Get User By ID",
        )
    )

    # -----------------------------
    # CREATE USER
    # -----------------------------

    if menu == "Create User":

        st.subheader("Create User")

        first_name = st.text_input("First Name")
        last_name = st.text_input("Last Name")
        email = st.text_input("Email")
        password = st.text_input(
            "Password",
            type="password"
        )

        if st.button("Create"):

            payload = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password
            }

            response = requests.post(
                f"{API_URL}/users/",
                json=payload
            )

            if response.status_code == 200:
                st.success("User Created Successfully")
                st.json(response.json())

            else:
                st.error(response.text)

    # -----------------------------
    # GET ALL USERS
    # -----------------------------

    elif menu == "Get All Users":

        st.subheader("All Users")

        if st.button("Load Users"):

            response = requests.get(
                f"{API_URL}/users/"
            )

            if response.status_code == 200:

                users = response.json()

                st.table(users)

            else:

                st.error(response.text)

    # -----------------------------
    # GET USER BY ID
    # -----------------------------

    elif menu == "Get User By ID":

        st.subheader("Search User")

        user_id = st.number_input(
            "User ID",
            min_value=1,
            step=1
        )

        if st.button("Search"):

            response = requests.get(
                f"{API_URL}/users/{user_id}"
            )

            if response.status_code == 200:

                st.json(response.json())

            else:

                st.error(response.text)