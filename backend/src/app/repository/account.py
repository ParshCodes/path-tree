from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import get_password_hash, verify_password
from app.models.account import Account


class AccountRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, email: str, name: str, password: str) -> Account:
        acc = Account(email=email, name=name, password_hash=get_password_hash(password))
        self.db.add(acc)
        await self.db.flush()
        return acc

    async def get_by_email(self, email: str) -> Account | None:
        stmt = select(Account).where(Account.email == email)
        res = await self.db.execute(stmt)
        return res.scalar_one_or_none()

    async def authenticate(self, email: str, password: str) -> Account | None:
        user = await self.get_by_email(email)
        if not user:
            return None
        if not verify_password(password, user.password_hash):
            return None
        return user
