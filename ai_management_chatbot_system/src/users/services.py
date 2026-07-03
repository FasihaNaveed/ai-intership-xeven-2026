from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.users.schemas import UserCreate
from src.users.utils import UserUtils


class UserService:

    @staticmethod
    async def create_user(
        db: Session,
        user_data: UserCreate,
    ):
        try:
            return await UserUtils.create_user(
                db,
                user_data,
            )

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def get_users(
        db: Session,
        enable_pagination: bool = False,
        page_size: int = 12,
        page_no: int = 1,
        search: str = "",
    ):
        try:
            return await UserUtils.get_all_users(
                db=db,
                enable_pagination=enable_pagination,
                page_size=page_size,
                page_no=page_no,
                search=search,
            )

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def get_user(
        db: Session,
        user_id: int,
    ):
        try:
            user = await UserUtils.get_user_by_id(
                db,
                user_id,
            )

            if not user:
                raise HTTPException(
                    status_code=404,
                    detail="User not found.",
                )

            return user

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def update_user(
        db: Session,
        user_id: int,
        user_data: UserCreate,
    ):
        try:
            return await UserUtils.update_user(
                db,
                user_id,
                user_data,
            )

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def delete_user(
        db: Session,
        user_id: int,
    ):
        try:
            user = await UserUtils.get_user_by_id(
                db,
                user_id,
            )

            if not user:
                raise HTTPException(
                    status_code=404,
                    detail="User not found.",
                )

            await UserUtils.delete_user(
                db,
                user,
            )

            return {
                "message": "User deleted successfully."
            }

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def assign_subject(
        db: Session,
        user_id: int,
        subject_id: int,
    ):
        try:
            return await UserUtils.assign_subject(
                db,
                user_id,
                subject_id,
            )

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

    @staticmethod
    async def assign_instructor(
        db: Session,
        user_id: int,
        instructor_id: int,
    ):
        try:
            return await UserUtils.assign_instructor(
                db,
                user_id,
                instructor_id,
            )

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e),
            )