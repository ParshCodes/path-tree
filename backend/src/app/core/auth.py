from datetime import datetime, timedelta
from typing import Optional
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from pwdlib import PasswordHash

from app.core.settings import settings

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
REFRESH_SECRET_KEY = settings.refresh_secret_key
REFRESH_TOKEN_EXPIRE_DAYS = settings.refresh_token_expire_days
password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/user/login")


def create_access_token(data: dict, expires_delta: timedelta ) -> str:
    """
    Create a JWT access token.

    Args:
        data: The data to encode in the token
        expires_delta: Optional custom expiration time

    Returns:
        str: The encoded JWT token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    #print(f"DEBUG create_access_token: Created token expiring at {expire} UTC")
    return encoded_jwt


def get_password_hash(password: str) -> str:
    """
    Hash a plaintext password.

    Args:
        password: The plaintext password to hash

    Returns:
        str: The hashed password
    """
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against a hashed password.

    Args:
        plain_password: The plaintext password to verify
        hashed_password: The hashed password to compare against

    Returns:
        bool: True if password matches, False otherwise
    """
    return password_hash.verify(plain_password, hashed_password)


def verify_token(token: str) -> dict :
    """
    Verify and decode a JWT token.

    Args:
        token: The JWT token to verify

    Returns:
        dict | None: The decoded payload if valid, None otherwise
    """
    try:
        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=[settings.algorithm],
        )
    except PyJWTError as e:
        return None
    except Exception as e:
        return None
    else:
        return payload


async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Minimal dependency that validates the JWT and returns the token payload.

    This is intentionally lightweight: it decodes the token and returns the
    payload as a dict. If you want to look up a full Account from the DB,
    we can extend this to depend on `get_async_session` and call an async
    repository method—right now the repository code appears to be
    synchronous, so that change is left for a follow-up to avoid breaking
    behavior.
    """
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload
    
def create_refresh_token(data: dict, expires_delta: timedelta) -> str:
    """
    Create a JWT refresh token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    # ✅ use REFRESH_SECRET_KEY here
    return jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)


def verify_refresh_token(token: str) -> Optional[dict] :
    """
    Verify and decode a JWT refresh token.
    Returns the payload if valid, otherwise None.
    """
    try:
        payload = jwt.decode(
            token,
            REFRESH_SECRET_KEY,        
            algorithms=[ALGORITHM],
        )
    except PyJWTError:
        return None
    else:
        return payload
