from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.program import Program, Stream, ProgramRequirement


class ProgramRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_programs(self, faculty: str | None, level: str | None) -> list[Program]:
        stmt = select(Program)
        if faculty:
            stmt = stmt.where(Program.faculty == faculty)
        if level:
            stmt = stmt.where(Program.level == level)
        res = await self.db.execute(stmt)
        return list(res.scalars().all())

    async def get_program(self, program_id: str) -> Program | None:
        return await self.db.get(Program, program_id)

    async def list_streams(self, program_id: str) -> list[Stream]:
        stmt = select(Stream).where(Stream.program_id == program_id)
        res = await self.db.execute(stmt)
        return list(res.scalars().all())

    async def list_requirements(self, program_id: str, stream_id: str | None) -> list[ProgramRequirement]:
        stmt = select(ProgramRequirement).where(ProgramRequirement.program_id == program_id)
        if stream_id:
            stmt = stmt.where(ProgramRequirement.stream_id == stream_id)
        res = await self.db.execute(stmt)
        return list(res.scalars().all())

    # NEW: create a program
    async def create_program(self, *, id: str, title: str, faculty: str | None, level: str | None) -> Program:
        p = Program(id=id, title=title, faculty=faculty, level=level)
        self.db.add(p)
        await self.db.flush()
        return p
