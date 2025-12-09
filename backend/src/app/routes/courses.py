from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.repository.course import CourseRepository
from app.schemas.course import CourseOut

router = APIRouter()


@router.get("", response_model=list[CourseOut])
async def list_courses(
    search: str | None = None,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
):
    """List courses with optional search filter."""
    repo = CourseRepository(db)
    courses = await repo.list_courses(search=search, limit=limit)
    return [CourseOut.model_validate(c, from_attributes=True) for c in courses]


@router.get("/{course_code}", response_model=CourseOut)
async def get_course(
    course_code: str,
    db: AsyncSession = Depends(get_db),
):
    """Get a specific course by code."""
    repo = CourseRepository(db)
    course = await repo.get(course_code)
    if not course:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Course not found")
    return CourseOut.model_validate(course, from_attributes=True)
