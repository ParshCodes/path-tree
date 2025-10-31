from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.repository.plan import PlanRepository
from app.schemas.plan import (
    PlanCreate,
    PlanOut,
    PlanUpdate,
    PlanTermCreate,
    PlanTermOut,
    PlanCourseCreate,
)
from app.schemas.account import AccountOut

router = APIRouter()

@router.get("", response_model=list[PlanOut])
async def list_plans(
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plans = await repo.list_plans(me.email)
    return [PlanOut.model_validate(p, from_attributes=True) for p in plans]

@router.post("", response_model=PlanOut, status_code=status.HTTP_201_CREATED)
async def create_plan(
    payload: PlanCreate,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plan = await repo.create_plan(owner_email=me.email, name=payload.name, program_id=payload.program_id)
    return PlanOut.model_validate(plan, from_attributes=True)

@router.get("/{plan_id}", response_model=PlanOut)
async def get_plan(
    plan_id: int,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plan = await repo.get(plan_id)
    if not plan or plan.owner_email != me.email:
        raise HTTPException(status_code=404, detail="Plan not found")
    return PlanOut.model_validate(plan, from_attributes=True)

@router.patch("/{plan_id}", response_model=PlanOut)
async def update_plan(
    plan_id: int,
    payload: PlanUpdate,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plan = await repo.get(plan_id)
    if not plan or plan.owner_email != me.email:
        raise HTTPException(status_code=404, detail="Plan not found")
    if payload.name:
        plan = await repo.update_name(plan, payload.name)
    return PlanOut.model_validate(plan, from_attributes=True)

@router.delete("/{plan_id}", status_code=204)
async def delete_plan(
    plan_id: int,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plan = await repo.get(plan_id)
    if not plan or plan.owner_email != me.email:
        raise HTTPException(status_code=404, detail="Plan not found")
    await repo.delete(plan_id)
    return None

# ---- Terms & Courses ----

@router.get("/{plan_id}/terms", response_model=list[PlanTermOut])
async def list_terms(
    plan_id: int,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plan = await repo.get(plan_id)
    if not plan or plan.owner_email != me.email:
        raise HTTPException(status_code=404, detail="Plan not found")
    terms = await repo.list_terms(plan_id)
    return [PlanTermOut.model_validate(t, from_attributes=True) for t in terms]

@router.post("/{plan_id}/terms", response_model=PlanTermOut, status_code=201)
async def add_term(
    plan_id: int,
    payload: PlanTermCreate,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plan = await repo.get(plan_id)
    if not plan or plan.owner_email != me.email:
        raise HTTPException(status_code=404, detail="Plan not found")
    term = await repo.add_term(plan_id, payload.term_code)
    return PlanTermOut.model_validate(term, from_attributes=True)

@router.post("/{plan_id}/terms/{term_id}/courses", status_code=201)
async def add_course(
    plan_id: int,
    term_id: int,
    payload: PlanCourseCreate,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plan = await repo.get(plan_id)
    if not plan or plan.owner_email != me.email:
        raise HTTPException(status_code=404, detail="Plan not found")

    term_ids = {t.id for t in await repo.list_terms(plan_id)}
    if term_id not in term_ids:
        raise HTTPException(status_code=404, detail="Term not found")

    pc = await repo.add_course(term_id=term_id, course_code=payload.course_code)
    return {"id": pc.id, "term_id": pc.term_id, "course_code": pc.course_code}

@router.delete("/{plan_id}/terms/{term_id}/courses/{course_code}", status_code=204)
async def remove_course(
    plan_id: int,
    term_id: int,
    course_code: str,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    repo = PlanRepository(db)
    plan = await repo.get(plan_id)
    if not plan or plan.owner_email != me.email:
        raise HTTPException(status_code=404, detail="Plan not found")

    term_ids = {t.id for t in await repo.list_terms(plan_id)}
    if term_id not in term_ids:
        raise HTTPException(status_code=404, detail="Term not found")

    await repo.remove_course(term_id=term_id, course_code=course_code)
    return None

# ---- Audit + Share stubs ----

@router.get("/{plan_id}/audit")
async def audit_plan(plan_id: int):
    # TODO: implement degree audit logic
    return {"plan_id": plan_id, "status": "audit_stub"}

@router.post("/{plan_id}/share-links")
async def create_share_link(plan_id: int):
    # TODO: implement shareable links
    return {"plan_id": plan_id, "share_url": f"https://example.com/share/{plan_id}"}
