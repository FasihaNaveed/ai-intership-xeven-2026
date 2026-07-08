from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import HTTPException, status

from src.users.models import User
from src.users.schemas import UserCreate

from src.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


class AuthService:

    @staticmethod
    async def register_user(
        payload: UserCreate,
        db: AsyncSession
    ):

        query = select(User).where(
            User.email == payload.email
        )

        result = await db.execute(query)

        existing_user = result.scalar_one_or_none()

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
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
    async def login_user(
        email: str,
        password: str,
        db: AsyncSession
    ):

        query = select(User).where(
            User.email == email
        )

        result = await db.execute(query)

        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        if not verify_password(
            password,
            user.hashed_password
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
                "role": user.role
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }