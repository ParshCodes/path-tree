from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.repository.account import AccountRepository
from app.schemas.account import AccountOut


class AccountService:
    def __init__(self, db: AsyncSession):
        self.repo = AccountRepository(db)

    async def register(self, email: str, name: str, password: str) -> AccountOut:
        if await self.repo.get_by_email(email):
            raise HTTPException(status_code=409, detail="Email already registered")
        user = await self.repo.create(email=email, name=name, password=password)
        return AccountOut.model_validate(user, from_attributes=True)

    async def authenticate(self, email: str, password: str):
        user = await self.repo.authenticate(email, password)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        return user
