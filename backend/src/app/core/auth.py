from datetime import UTC, datetime, timedelta
from typing import Optional

import jwt
from fastapi.security import OAuth2PasswordBearer
from jwt import ExpiredSignatureError, InvalidTokenError

from pwdlib import PasswordHash

from app.core.settings import settings

# Load secret/config
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

# Password hashing configuration (pwdlib chooses bcrypt automatically)
password_hash = PasswordHash.recommended()

# OAuth2 dependency (used by routes/dependencies)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# === JWT Token helpers ===

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    expire = datetime.now(UTC) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> dict | None:
    """
    Verify and decode a JWT token using PyJWT.
    Returns the decoded payload or None if invalid/expired.
    """
    try:
        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=[settings.algorithm],
        )
        return payload
    except (ExpiredSignatureError, InvalidTokenError):
        return None




# === Password helpers ===

def get_password_hash(password: str) -> str:
    """Hash a plaintext password."""
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check a plaintext password against a hashed one."""
    return password_hash.verify(plain_password, hashed_password)
