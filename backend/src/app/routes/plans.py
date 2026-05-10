from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
import json
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
    PlanCourseOut,
    PlanAuditOut,
    RequirementStatusOut,
)
from app.schemas.account import AccountOut

def _extract_courses_from_rule(raw_rule: str) -> list[str]:
    """
    Interpret ProgramRequirement.rule and extract a list of course codes.

    Supported formats:
      - JSON list: ["EE 210", "EE 230"]
      - JSON object: {"all_of": ["EE 210", "EE 230"]} or {"any_of": [...]}
      - Plain text: "EE 210, EE 230"
    """
    raw_rule = raw_rule.strip()
    if not raw_rule:
        return []

   
    try:
        data = json.loads(raw_rule)
    except json.JSONDecodeError:
      
        return [c.strip() for c in raw_rule.split(",") if c.strip()]

    if isinstance(data, dict):
        if "all_of" in data and isinstance(data["all_of"], list):
            return [str(c).strip() for c in data["all_of"] if str(c).strip()]
        if "any_of" in data and isinstance(data["any_of"], list):
            return [str(c).strip() for c in data["any_of"] if str(c).strip()]
    elif isinstance(data, list):
        return [str(c).strip() for c in data if str(c).strip()]

    return []
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

@router.delete("/{plan_id}/terms/{term_id}", status_code=204)
async def delete_term(
    plan_id: int,
    term_id: int,
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
    
    await repo.delete_term(term_id)
    return None

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


@router.get("/{plan_id}/audit", response_model=PlanAuditOut)
async def audit_plan(
    plan_id: int,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    """
    Basic degree audit:

    - Ensures the plan belongs to the logged-in user
    - Loads program requirements for the plan's program_id
    - Computes which requirements are satisfied based on completed courses
    """
    plan_repo = PlanRepository(db)
    program_repo = ProgramRepository(db)
    completion_repo = CompletionRepository(db)

    # This assumes PlanRepository has a get_plan method (it is used in PlanService)
    plan = await plan_repo.get_plan(plan_id)  # type: ignore[attr-defined]
    if not plan or plan.owner_email != me.email:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")

    # If no program attached yet, just return an empty audit
    if not plan.program_id:
        return PlanAuditOut(
            plan_id=plan.id,
            program_id=None,
            total_requirements=0,
            satisfied_count=0,
            requirements=[],
        )

    # Load requirements for this program (and all streams for now)
    requirements = await program_repo.list_requirements(
        program_id=plan.program_id,
        stream_id="",  # empty means "no stream filter" in your repository
    )

    # Load student's completions
    completions = await completion_repo.list_completions(student_email=me.email)
    completed_courses = {
        c.course_code for c in completions if c.status == "completed"
    }

    requirement_statuses: list[RequirementStatusOut] = []
    satisfied_count = 0

    for req in requirements:
        rule_courses = _extract_courses_from_rule(req.rule)
        # Consider a requirement satisfied if *all* rule courses are completed
        missing = [c for c in rule_courses if c not in completed_courses]
        satisfied = len(missing) == 0 and len(rule_courses) > 0

        if satisfied:
            satisfied_count += 1

        requirement_statuses.append(
            RequirementStatusOut(
                requirement_id=req.id,
                rule=req.rule,
                satisfied=satisfied,
                completed_courses=sorted(set(rule_courses) & completed_courses),
                missing_courses=missing,
            )
        )

    return PlanAuditOut(
        plan_id=plan.id,
        program_id=plan.program_id,
        total_requirements=len(requirements),
        satisfied_count=satisfied_count,
        requirements=requirement_statuses,
    )