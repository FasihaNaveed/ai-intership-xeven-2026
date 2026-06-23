from fastapi import FastAPI, UploadFile, File, Form
from typing import Optional
import shutil
import os

app = FastAPI()

users = []

if not os.path.exists("uploads"):
    os.makedirs("uploads")


@app.get("/")
def home():
    return {"message": "User Management API Running"}


# GET ALL USERS
@app.get("/users")
def get_users():
    return users


# GET SINGLE USER
@app.get("/users/{user_id}")
def get_user(user_id: int):

    for user in users:
        if user["id"] == user_id:
            return user

    return {"message": "User Not Found"}


# CREATE + UPDATE IN ONE API
@app.post("/user/save")
async def save_user(
    id: Optional[int] = Form(None),
    name: str = Form(...),
    email: str = Form(...),
    profile_image: Optional[UploadFile] = File(None)
):

    image_name = None

    if profile_image:

        image_name = profile_image.filename

        with open(
            f"uploads/{profile_image.filename}",
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                profile_image.file,
                buffer
            )

    # UPDATE

    if id:

        for user in users:

            if user["id"] == id:

                user["name"] = name
                user["email"] = email

                if image_name:
                    user["image"] = image_name

                return {
                    "message": "User Updated",
                    "user": user
                }

    # CREATE

    new_id = len(users) + 1

    user = {
        "id": new_id,
        "name": name,
        "email": email,
        "image": image_name
    }

    users.append(user)

    return {
        "message": "User Created",
        "user": user
    }


# DELETE USER
@app.delete("/users/{user_id}")
def delete_user(user_id: int):

    global users

    users = [
        user
        for user in users
        if user["id"] != user_id
    ]

    return {
        "message": "User Deleted"
    }