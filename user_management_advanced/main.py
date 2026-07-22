from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    HTTPException
)

from fastapi.responses import JSONResponse

from sqlalchemy.orm import Session

from database import (
    SessionLocal,
    engine
)

from models import (
    Base,
    User
)

from typing import Optional

import shutil
import os
import time

from loguru import logger
import logging # Use this library for logging, make your handler (file, console) through this library 



Base.metadata.create_all(bind=engine)

app = FastAPI()

logger.add("app.log")


if not os.path.exists("uploads"):
    os.makedirs("uploads")


@app.middleware("http")
async def log_requests(
    request,
    call_next
):

    start = time.time()

    response = await call_next(
        request
    )

    duration = (
        time.time() - start
    )

    print(
        f"{request.method}"
        f" {request.url}"
        f" {response.status_code}"
    )

    logger.info(
        f"{request.method}"
        f" {request.url}"
        f" {response.status_code}"
    )

    return response


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@app.get("/")
def home():

    return JSONResponse(
        status_code=200,
        content={
            "message":
            "User Management Running"
        }
    )


@app.get("/users")
def get_users():

    db = SessionLocal()

    try:

        users = db.query(
            User
        ).all()

        # Use sql alchemy functions for frtching, inserting of data in db

        result = []

        for user in users:

            result.append({

                "id": user.id,
                "name": user.name,
                "email": user.email,
                "image": user.image

            })

        content= {
            "data": result,
            "message": "",
            "status": "success"
        }

        return JSONResponse(
            status_code=200, # import status library from fastapi and then use status code from it
            content=result
        )

    except Exception as e:

        print("Error:", e)

        logger.error(e)

        return JSONResponse(
            status_code=500,
            content={
                "message": f"Error while getting users: {e}"
            }
        )


@app.post("/user/save")
async def save_user(

    id: Optional[int] = Form(
        None
    ),

    name: str = Form(...),

    email: str = Form(...),

    profile_image:
    Optional[UploadFile]
    = File(None)

):

    db = SessionLocal()

    try:

        image_name = None

        if profile_image:

            image_name = (
                profile_image.filename
            )

            with open(
                f"uploads/{image_name}",
                "wb"
            ) as buffer:

                shutil.copyfileobj(
                    profile_image.file,
                    buffer
                )

        if id:

            user = db.query(
                User
            ).filter(
                User.id == id
            ).first()

            if user:

                user.name = name
                user.email = email

                if image_name:
                    user.image = image_name

                db.commit()

                return JSONResponse(
                    status_code=200,
                    content={
                        "message":
                        "User Updated"
                    }
                )

        user = User(
            name=name,
            email=email,
            image=image_name
        )

        db.add(user)

        db.commit()

        return JSONResponse(
            status_code=201,
            content={
                "message":
                "User Created"
            }
        )

    except Exception as e:

        print("Error:", e)

        logger.error(e)

        return JSONResponse(
            status_code=500,
            content={
                "message":
                str(e)
            }
        )


@app.delete("/user")
def delete_user(id: int):

    db = SessionLocal()

    try:

        user = db.query(
            User
        ).filter(
            User.id == id
        ).first()

        if not user:

            return JSONResponse(
                status_code=404,
                content={
                    "message":
                    "User Not Found"
                }
            )

        db.delete(user)

        db.commit()

        return JSONResponse(
            status_code=200,
            content={
                "message":
                "User Deleted"
            }
        )

    except Exception as e:

        print("Error:", e)

        logger.error(e)

        return JSONResponse(
            status_code=500,
            content={
                "message":
                str(e)
            }
        )
    
    #create through folder structure