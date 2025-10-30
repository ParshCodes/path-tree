# auth.py
# Stub for authentication endpoints

from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.repository import account as account_repo
from app.core.auth import create_access_token
from app.core.settings import settings
from app.schemas.account import AccountCreate, Token

router = APIRouter()


@router.post("/login", response_model=Token)
def login(credentials: AccountCreate, db: Session = Depends(get_db)):
	"""Authenticate user and return JWT access token.

	This endpoint expects JSON payload {"email":..., "password":...}.
	"""
	user = account_repo.authenticate(db, credentials.email, credentials.password)
	if not user:
		raise HTTPException(status_code=401, detail="Invalid credentials")

	access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
	access_token = create_access_token(
		data={"sub": str(user.id)}, expires_delta=access_token_expires
	)

	return Token(access_token=access_token)

