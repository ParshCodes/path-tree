from pydantic import BaseModel, EmailStr, Field


class AccountCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=255)
    password: str = Field(min_length=6, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AccountOut(BaseModel):
    email: EmailStr
    name: str
