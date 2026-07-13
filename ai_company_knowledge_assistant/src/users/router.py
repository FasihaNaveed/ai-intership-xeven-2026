from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db
from src.users.schemas import (
    UserCreate,
    UserUpdate,
    UserResponse,
    UsersListingResponse
)
from src.users.services import UserService


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post(
    "/",
    response_model=UserResponse
)
async def create_user(
    payload: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    return await UserService.create_user(
        payload,
        db
    )


@router.get(
    "/",
    response_model=UsersListingResponse
)
async def get_users(
    page_no: int = 1,
    page_size: int = 10,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    return await UserService.get_users(
        db=db,
        page_no=page_no,
        page_size=page_size,
        search=search
    )


@router.get(
    "/{user_id}",
    response_model=UserResponse
)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await UserService.get_user(
        user_id,
        db
    )


@router.put(
    "/{user_id}",
    response_model=UserResponse
)
async def update_user(
    user_id: int,
    payload: UserUpdate,
    db: AsyncSession = Depends(get_db)
):
    return await UserService.update_user(
        user_id,
        payload,
        db
    )


@router.delete(
    "/{user_id}"
)
async def delete_user(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await UserService.delete_user(
        user_id,
        db
    )