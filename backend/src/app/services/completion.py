from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.repository.completion import CompletionRepository


class CompletionService:
    def __init__(self, db: AsyncSession):
        self.repo = CompletionRepository(db)

    async def list_completions(self, student_email: str):
        """Get all course completions for a student."""
        return await self.repo.list_completions(student_email)

    async def create_completion(
        self,
        student_email: str,
        course_code: str,
        status: str,
        grade: str | None = None,
        term_code: str | None = None,
        units_earned: int | None = None,
    ):
        """Create a new course completion record."""
        return await self.repo.create_completion(
            student_email=student_email,
            course_code=course_code,
            status=status,
            grade=grade,
            term_code=term_code,
            units_earned=units_earned,
        )

    async def get_owned_completion(self, completion_id: int, student_email: str):
        """Get a completion record only if it belongs to the student."""
        completion = await self.repo.get(completion_id)
        if not completion or completion.student_email != student_email:
            raise HTTPException(status_code=404, detail="Completion not found")
        return completion

    async def update_completion(
        self,
        completion_id: int,
        student_email: str,
        status: str | None = None,
        grade: str | None = None,
        term_code: str | None = None,
        units_earned: int | None = None,
    ):
        """Update a completion record."""
        completion = await self.get_owned_completion(completion_id, student_email)
        return await self.repo.update_completion(
            completion=completion,
            status=status,
            grade=grade,
            term_code=term_code,
            units_earned=units_earned,
        )

    async def delete(self, completion_id: int, student_email: str):
        """Delete a completion record."""
        await self.get_owned_completion(completion_id, student_email)
        await self.repo.delete(completion_id)
