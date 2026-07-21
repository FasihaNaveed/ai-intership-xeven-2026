from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ==========================
# User Info
# ==========================

class LoginUserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    organization: str


# ==========================
# Login Response
# ==========================

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

    user: LoginUserResponse