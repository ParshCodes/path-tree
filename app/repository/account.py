from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.account import Account
from app.schemas.account import AccountCreate
from app.core.auth import get_password_hash, verify_password

def get_by_email(db: Session, email: str) -> Account | None:
    return db.execute(select(Account).where(Account.email == email)).scalar_one_or_none()

def create(db: Session, data: AccountCreate) -> Account:
    row = Account(email=data.email, password_hash=get_password_hash(data.password))
    db.add(row)
    db.commit()
    db.refresh(row)
    return row

def authenticate(db: Session, email: str, password: str) -> Account | None:
    user = get_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
