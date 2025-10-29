from pydantic import BaseModel, EmailStr

class AccountBase(BaseModel):
    email: EmailStr

class AccountCreate(AccountBase):
    password: str

class AccountOut(AccountBase):
    id: str
    role: str = "student"
    email_verified: bool = False

    class Config:
        from_attributes = True  

class Token(BaseModel):
    access_token: str
    token_type: str = "Bearer"

class TokenPair(Token):
    refresh_token: str
