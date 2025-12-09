from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.course import Course


class CourseRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_courses(self, search: str | None = None, limit: int = 100) -> list[Course]:
        """List courses with optional search filter."""
        stmt = select(Course).order_by(Course.code)
        
        if search:
            search_pattern = f"%{search}%"
            stmt = stmt.where(
                (Course.code.ilike(search_pattern)) | 
                (Course.title.ilike(search_pattern))
            )
        
        stmt = stmt.limit(limit)
        res = await self.db.execute(stmt)
        return list(res.scalars().all())

    async def get(self, course_code: str) -> Course | None:
        """Get a specific course by code."""
        return await self.db.get(Course, course_code)
