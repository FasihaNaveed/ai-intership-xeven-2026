from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, Literal
import re

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Literal[
        "admin",
        "employee",
        "manager"
    ] = "employee"

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        if len(value) < 8:
            raise ValueError(
                "Password must be at least 8 characters long"
            )

        if not re.search(r"[A-Z]", value):
            raise ValueError(
                "Password must contain at least one uppercase letter"
            )

        if not re.search(r"[a-z]", value):
            raise ValueError(
                "Password must contain at least one lowercase letter"
            )

        if not re.search(r"\d", value):
            raise ValueError(
                "Password must contain at least one number"
            )

        return value

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    role: Optional[
        Literal[
            "admin",
            "employee",
            "manager"
        ]
    ] = None

    is_active: Optional[bool] = None

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    role: str
    is_active: bool

    model_config = {
        "from_attributes": True
    }


class UsersListingResponse(BaseModel):
    total_records: int
    total_pages: int
    current_page: int
    page_size: int
    data: list[UserResponse]