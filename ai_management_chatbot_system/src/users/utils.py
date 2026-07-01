from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.users.models import User


class UserUtils:

    @staticmethod
    async def get_user_by_email(db: Session, email: str):
        try:
            return db.query(User).filter(User.email == email).first()

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to get user by email: {str(e)}"
            )

    @staticmethod
    async def get_user_by_id(db: Session, user_id: int):
        try:
            return db.query(User).filter(User.id == user_id).first()

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to get user by id: {str(e)}"
            )

    @staticmethod
    async def get_all_users(db: Session):
        try:
            return db.query(User).all()

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to get users: {str(e)}"
            )

    @staticmethod
    async def create_user(db: Session, user_data):
        try:
            existing_user = await UserUtils.get_user_by_email(
                db,
                user_data.email
            )

            if existing_user:
                raise HTTPException(
                    status_code=400,
                    detail="Email already exists."
                )

            new_user = User(
                first_name=user_data.first_name,
                last_name=user_data.last_name,
                email=user_data.email,
                password=user_data.password,
            )

            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            return new_user

        except HTTPException:
            raise

        except Exception as e:
            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=f"Failed to create user: {str(e)}"
            )

    @staticmethod
    async def update_user(
        db: Session,
        user_id: int,
        user_data,
    ):
        try:

            user = await UserUtils.get_user_by_id(
                db,
                user_id,
            )

            if not user:
                raise HTTPException(
                    status_code=404,
                    detail="User not found."
                )

            user.first_name = user_data.first_name
            user.last_name = user_data.last_name
            user.email = user_data.email
            user.password = user_data.password

            db.commit()
            db.refresh(user)

            return user

        except HTTPException:
            raise

        except Exception as e:
            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=f"Failed to update user: {str(e)}"
            )

    @staticmethod
    async def assign_subject(
        db: Session,
        user_id: int,
        subject_id: int,
    ):
        try:
            from src.subjects.utils import SubjectUtils

            user = await UserUtils.get_user_by_id(
                db,
                user_id,
            )

            if not user:
                raise HTTPException(
                    status_code=404,
                    detail="User not found."
                )

            subject_obj = await SubjectUtils.get_subject_by_id(
                db,
                subject_id,
            )

            if not subject_obj:
                raise HTTPException(
                    status_code=404,
                    detail="Subject not found."
                )

            if subject_obj not in user.subjects:
                user.subjects.append(subject_obj)

            db.commit()
            db.refresh(user)

            return {
                "message": "Subject assigned successfully."
            }

        except HTTPException:
            raise

        except Exception as e:
            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=f"Failed to assign subject: {str(e)}"
            )

    @staticmethod
    async def assign_instructor(
        db: Session,
        user_id: int,
        instructor_id: int,
    ):
        try:
            from src.instructors.utils import InstructorUtils

            user = await UserUtils.get_user_by_id(
                db,
                user_id,
            )

            if not user:
                raise HTTPException(
                    status_code=404,
                    detail="User not found."
                )

            instructor_obj = await InstructorUtils.get_instructor_by_id(
                db,
                instructor_id,
            )

            if not instructor_obj:
                raise HTTPException(
                    status_code=404,
                    detail="Instructor not found."
                )

            if instructor_obj not in user.instructors:
                user.instructors.append(instructor_obj)

            db.commit()
            db.refresh(user)

            return {
                "message": "Instructor assigned successfully."
            }

        except HTTPException:
            raise

        except Exception as e:
            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=f"Failed to assign instructor: {str(e)}"
            )

    @staticmethod
    async def delete_user(
        db: Session,
        user: User,
    ):
        try:
            db.delete(user)
            db.commit()

            return True

        except Exception as e:
            db.rollback()

            raise HTTPException(
                status_code=500,
                detail=f"Failed to delete user: {str(e)}"
            )