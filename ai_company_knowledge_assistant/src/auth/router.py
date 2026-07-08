from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db
from src.auth.services import AuthService
from src.users.schemas import (
    UserCreate,
    UserResponse
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
async def register(
    payload: UserCreate,
    db: AsyncSession = Depends(get_db)
):

    user = await AuthService.register_user(
        payload,
        db
    )

    return user


@router.get("/health")
async def health():
    return {
        "message": "Auth module working"
    }

from src.auth.schemas import (
    LoginRequest,
    TokenResponse
)


@router.post(
    "/login",
    response_model=TokenResponse
)
async def login(
    payload: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    return await AuthService.login_user(
        payload.email,
        payload.password,
        db
    )