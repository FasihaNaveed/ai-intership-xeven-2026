from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from fastapi import HTTPException, status

from src.users.models import User
from src.users.schemas import (
    UserCreate,
    UserUpdate,
    UsersListingResponse
)

from src.auth.utils import hash_password


class UserService:

    @staticmethod
    async def create_user(
        payload: UserCreate,
        db: AsyncSession
    ):

        existing_user = await db.execute(
            select(User).where(
                User.email == payload.email
            )
        )

        existing_user = existing_user.scalar_one_or_none()

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )

        user = User(
            full_name=payload.full_name,
            email=payload.email,
            hashed_password=hash_password(
                payload.password
            ),
            role=payload.role
        )

        db.add(user)

        await db.commit()

        await db.refresh(user)

        return user

    @staticmethod
    async def get_users(
        db: AsyncSession,
        page_no: int = 1,
        page_size: int = 10,
        search: str | None = None
    ):

        query = select(User)

        if search:
            query = query.where(
                User.full_name.ilike(
                    f"%{search}%"
                )
            )

        total_records = await db.execute(
            select(func.count()).select_from(
                query.subquery()
            )
        )

        total_records = total_records.scalar()

        offset = (page_no - 1) * page_size

        result = await db.execute(
            query.offset(offset).limit(page_size)
        )

        users = result.scalars().all()

        total_pages = (
            total_records + page_size - 1
        ) // page_size

        return UsersListingResponse(
            total_records=total_records,
            total_pages=total_pages,
            current_page=page_no,
            page_size=page_size,
            data=users
        )

    @staticmethod
    async def get_user(
        user_id: int,
        db: AsyncSession
    ):

        result = await db.execute(
            select(User).where(
                User.id == user_id
            )
        )

        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        return user

    @staticmethod
    async def update_user(
        user_id: int,
        payload: UserUpdate,
        db: AsyncSession
    ):

        user = await UserService.get_user(
            user_id,
            db
        )

        update_data = payload.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(user, key, value)

        await db.commit()

        await db.refresh(user)

        return user

    @staticmethod
    async def delete_user(
        user_id: int,
        db: AsyncSession
    ):

        user = await UserService.get_user(
            user_id,
            db
        )

        await db.delete(user)

        await db.commit()

        return {
            "message": "User deleted successfully"
        }