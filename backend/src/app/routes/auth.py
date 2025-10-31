from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import create_access_token
from app.core.database import get_db
from app.repository.account import AccountRepository
from app.schemas.account import AccountCreate, AccountOut, LoginRequest
from app.schemas.token import Token

router = APIRouter()

@router.post("/register", response_model=AccountOut, status_code=status.HTTP_201_CREATED)
async def register(payload: AccountCreate, db: AsyncSession = Depends(get_db)):
    repo = AccountRepository(db)
    if await repo.get_by_email(payload.email):
        raise HTTPException(status_code=409, detail="Email already registered")
    user = await repo.create(payload.email, payload.name, payload.password)
    return AccountOut.model_validate(user, from_attributes=True)

@router.post("/login", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    repo = AccountRepository(db)
    # In our system "username" is the email
    user = await repo.authenticate(form.username, form.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=15))
    return Token(access_token=token, token_type="bearer")

@router.post("/login-json", response_model=Token, include_in_schema=True)
async def login_json(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    repo = AccountRepository(db)
    user = await repo.authenticate(payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=15))
    return Token(access_token=token, token_type="bearer")

@router.get("/me", response_model=AccountOut, include_in_schema=False)
async def me(current_user: AccountOut = Depends()):
    return current_user
