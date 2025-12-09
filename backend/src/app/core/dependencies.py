from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordBearer

from app.core.auth import verify_token, oauth2_scheme
from app.core.database import get_db
from app.repository.account import AccountRepository
from app.schemas.account import AccountOut


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> AccountOut:
    """Extract and validate user from JWT token."""
    print(f"DEBUG: Received token: {token[:20]}...")
    payload = verify_token(token)
    print(f"DEBUG: Token payload: {payload}")
    if not payload:
        print("DEBUG: Token verification failed")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    sub = payload.get("sub")
    print(f"DEBUG: Token subject (email): {sub}")
    if not sub:
        print("DEBUG: No subject in token")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token missing subject")

    repo = AccountRepository(db)
    user = await repo.get_by_email(sub)
    print(f"DEBUG: User found: {user is not None}")
    if not user:
        print(f"DEBUG: No user found for email: {sub}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return AccountOut.model_validate(user, from_attributes=True)
