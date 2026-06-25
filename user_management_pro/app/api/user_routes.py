from fastapi import (
    APIRouter,
    status,
    Depends,
    Form
)

from fastapi.responses import JSONResponse

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models import User

router = APIRouter()


@router.get("/")
async def home():

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "message": "User Management Pro Running"
        }
    )


@router.get("/users")
async def get_users(
    db: AsyncSession = Depends(get_db)
):

    result = await db.execute(
        select(User)
    )

    users = result.scalars().all()

    data = []

    for user in users:

        data.append({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "image": user.image
        })

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=data
    )


@router.post("/user/save")
async def save_user(
    name: str = Form(...),
    email: str = Form(...),
    db: AsyncSession = Depends(get_db)
):

    user = User(
        name=name,
        email=email
    )

    db.add(user)

    await db.commit()

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={
            "message": "User Created"
        }
    )


@router.delete("/user")
async def delete_user(
    id: int,
    db: AsyncSession = Depends(get_db)
):

    result = await db.execute(
        select(User).where(
            User.id == id
        )
    )

    user = result.scalar_one_or_none()

    if not user:

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={
                "message": "User Not Found"
            }
        )

    await db.delete(user)

    await db.commit()

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "message": "User Deleted"
        }
    )