from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
import jwt
from jwt import PyJWTError
from fastapi import APIRouter, Depends, HTTPException, status, Response
from app.core.auth import create_access_token,create_refresh_token, oauth2_scheme
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.settings import settings
from app.repository.account import AccountRepository
from app.schemas.account import AccountCreate, AccountOut, LoginRequest
from app.schemas.token import Token, RefreshRequest

# Constants from settings
REFRESH_SECRET_KEY = settings.refresh_secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
REFRESH_TOKEN_EXPIRE_DAYS = settings.refresh_token_expire_days

router = APIRouter()

@router.post("/register", response_model=AccountOut, status_code=status.HTTP_201_CREATED)
async def register(payload: AccountCreate, db: AsyncSession = Depends(get_db)):
    repo = AccountRepository(db)
    if await repo.get_by_email(payload.email): 
        raise HTTPException(status_code=409, detail="Email already registered")
    user = await repo.create(payload.email, payload.name, payload.password)
    return AccountOut.model_validate(user, from_attributes=True)

# OAuth2 Password flow (Swagger uses this): expects form fields `username` and `password`
@router.post("/login", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    repo = AccountRepository(db)
    # In our app, "username" is the email
    user = await repo.authenticate(form.username, form.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=15))
    refresh= create_refresh_token(data={"sub": user.email}, expires_delta=timedelta(days=30))
    return Token(access_token=token, refresh_token=refresh, token_type="bearer")


@router.post("/login-json", response_model=Token)
async def login_json(
    payload: LoginRequest,
    db: AsyncSession = Depends(get_db),
    response: Response = None,
):
    repo = AccountRepository(db)
    user = await repo.authenticate(payload.email, payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    refresh_token = create_refresh_token(
        data={"sub": user.email},
        expires_delta=timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=False,  # True in production with HTTPS
        samesite="lax",
        path="/",
    )

    return Token(
        access_token="",  
        refresh_token=refresh_token,
        token_type="bearer",
    )
@router.post("/refresh", response_model=Token)
async def refresh_token(payload: RefreshRequest, response: Response):
    try:
        payload_data = jwt.decode(
            payload.refresh_token,
            REFRESH_SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        email: str = payload_data.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )
    except PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    new_access_token = create_access_token(
        data={"sub": email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    new_refresh_token = create_refresh_token(
        data={"sub": email},
        expires_delta=timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
    )

    # Reset the HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=new_access_token,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=False,  # True with HTTPS
        samesite="lax",
        path="/",
    )

    return Token(
        access_token="",
        refresh_token=new_refresh_token,
        token_type="bearer",
    )
@router.post("/logout", status_code=204, include_in_schema=True)
async def logout(response: Response):
    # Delete the access_token cookie
    response.delete_cookie(
        key="access_token",
        path="/",
    )
    return Response(status_code=204)
# Return the current user using the shared dependency
@router.get("/me", response_model=AccountOut)
async def me(current_user: AccountOut = Depends(get_current_user)):
    return current_user
