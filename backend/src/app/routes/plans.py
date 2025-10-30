from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_async_session
from app.core.auth import get_current_user
from app.schemas.plan import (
    PlanOut, PlanCreate, PlanUpdate,
    TermOut, TermCreate, TermUpdate,
    PlannedCourseCreate, PlannedCourseOut
)
from app.schemas.account import AccountOut
from app.repository.plan import PlanRepository

router = APIRouter(prefix="/plans", tags=["plans"])

@router.get("", response_model=List[PlanOut])
async def list_plans(
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """List all plans for the current user."""
    repo = PlanRepository(session)
    return await repo.list_plans(current_user.id)

@router.post("", response_model=PlanOut)
async def create_plan(
    plan: PlanCreate,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Create a new study plan."""
    repo = PlanRepository(session)
    return await repo.create_plan(current_user.id, plan)

@router.get("/{plan_id}", response_model=PlanOut)
async def get_plan(
    plan_id: str,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Get a specific plan by ID."""
    repo = PlanRepository(session)
    plan = await repo.get_plan(plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    if plan.student_profile_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this plan")
    return plan

@router.patch("/{plan_id}", response_model=PlanOut)
async def update_plan(
    plan_id: str,
    plan_update: PlanUpdate,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Update a study plan."""
    repo = PlanRepository(session)
    plan = await repo.get_plan(plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    if plan.student_profile_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to modify this plan")
    return await repo.update_plan(plan_id, plan_update)

@router.delete("/{plan_id}")
async def delete_plan(
    plan_id: str,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Delete a study plan."""
    repo = PlanRepository(session)
    plan = await repo.get_plan(plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    if plan.student_profile_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this plan")
    await repo.delete_plan(plan_id)
    return {"status": "success"}

# Term endpoints
@router.post("/{plan_id}/terms", response_model=TermOut)
async def add_term(
    plan_id: str,
    term: TermCreate,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Add a new term to a plan."""
    repo = PlanRepository(session)
    return await repo.add_term(plan_id, term)

@router.patch("/{plan_id}/terms/{term_id}", response_model=TermOut)
async def update_term(
    plan_id: str,
    term_id: str,
    term_update: TermUpdate,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Update a term in a plan."""
    repo = PlanRepository(session)
    return await repo.update_term(plan_id, term_id, term_update)

@router.delete("/{plan_id}/terms/{term_id}")
async def delete_term(
    plan_id: str,
    term_id: str,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Delete a term from a plan."""
    repo = PlanRepository(session)
    await repo.delete_term(plan_id, term_id)
    return {"status": "success"}

# Course planning endpoints
@router.post("/{plan_id}/terms/{term_id}/courses", response_model=PlannedCourseOut)
async def add_course(
    plan_id: str,
    term_id: str,
    course: PlannedCourseCreate,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Add a course to a term."""
    repo = PlanRepository(session)
    return await repo.add_course(plan_id, term_id, course)

@router.delete("/{plan_id}/terms/{term_id}/courses/{course_id}")
async def remove_course(
    plan_id: str,
    term_id: str,
    course_id: str,
    session: AsyncSession = Depends(get_async_session),
    current_user: AccountOut = Depends(get_current_user)
):
    """Remove a course from a term."""
    repo = PlanRepository(session)
    await repo.remove_course(plan_id, term_id, course_id)
    return {"status": "success"}
