from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_async_session
from app.core.auth import (
    get_current_user,
    create_access_token,
    create_refresh_token,
    verify_refresh_token
)
from app.schemas.account import AccountCreate, AccountOut, Token, TokenPair
from app.repository.account import AccountRepository

router = APIRouter(tags=["auth"])

@router.post("/register", response_model=AccountOut)
async def register(
    account: AccountCreate,
    session: AsyncSession = Depends(get_async_session)
):
    """Register a new user account."""
    repo = AccountRepository(session)
    
    # Check if email already exists
    if await repo.get_by_email(account.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    return await repo.create_account(account)

@router.post("/login", response_model=TokenPair)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_async_session)
):
    """Login with username (email) and password."""
    repo = AccountRepository(session)
    user = await repo.authenticate(form_data.username, form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return TokenPair(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id)
    )

@router.post("/refresh", response_model=Token)
async def refresh_token(
    token: str,
    session: AsyncSession = Depends(get_async_session)
):
    """Get a new access token using a refresh token."""
    user_id = verify_refresh_token(token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return Token(access_token=create_access_token(user_id))

@router.get("/me", response_model=AccountOut)
async def get_current_account(
    current_user: AccountOut = Depends(get_current_user)
):
    """Get the current user's account information."""
    return current_user
