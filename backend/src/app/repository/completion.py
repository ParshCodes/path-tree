from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.completion import Completion


class CompletionRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_completions(self, student_email: str) -> list[Completion]:
        """Get all course completions for a student."""
        stmt = select(Completion).where(Completion.student_email == student_email)
        res = await self.db.execute(stmt)
        return list(res.scalars().all())

    async def create_completion(
        self,
        student_email: str,
        course_code: str,
        status: str,
        grade: str | None = None,
        term_code: str | None = None,
        units_earned: int | None = None,
    ) -> Completion:
        """Add a new course completion record."""
        completion = Completion(
            student_email=student_email,
            course_code=course_code,
            status=status,
            grade=grade,
            term_code=term_code,
            units_earned=units_earned,
        )
        self.db.add(completion)
        await self.db.flush()
        return completion

    async def get(self, completion_id: int) -> Completion | None:
        """Get a specific completion by ID."""
        return await self.db.get(Completion, completion_id)

    async def update_completion(
        self,
        completion: Completion,
        status: str | None = None,
        grade: str | None = None,
        term_code: str | None = None,
        units_earned: int | None = None,
    ) -> Completion:
        """Update an existing completion record."""
        if status is not None:
            completion.status = status
        if grade is not None:
            completion.grade = grade
        if term_code is not None:
            completion.term_code = term_code
        if units_earned is not None:
            completion.units_earned = units_earned
        
        await self.db.flush()
        return completion

    async def delete(self, completion_id: int):
        """Delete a completion record."""
        stmt = delete(Completion).where(Completion.id == completion_id)
        await self.db.execute(stmt)
