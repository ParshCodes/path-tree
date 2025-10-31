from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.repository.program import ProgramRepository
from app.models.program import Program


class ProgramService:
    def __init__(self, db: AsyncSession):
        self.repo = ProgramRepository(db)

    async def list_programs(self, faculty: str | None, level: str | None):
        return await self.repo.list_programs(faculty, level)

    async def get_program(self, program_id: str) -> Program:
        prog = await self.repo.get_program(program_id)
        if not prog:
            raise HTTPException(status_code=404, detail="Program not found")
        return prog

    async def create_program(self, *, id: str, title: str, faculty: str | None, level: str | None) -> Program:
        if await self.repo.get_program(id):
            raise HTTPException(status_code=409, detail="Program already exists")
        return await self.repo.create_program(id=id, title=title, faculty=faculty, level=level)

    async def list_streams(self, program_id: str):
        # validate program exists
        await self.get_program(program_id)
        return await self.repo.list_streams(program_id)

    async def list_requirements(self, program_id: str, stream_id: str | None):
        # validate program exists
        await self.get_program(program_id)
        return await self.repo.list_requirements(program_id, stream_id)
