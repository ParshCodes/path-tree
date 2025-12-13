from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, distinct
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.models.plan import PlanTerm
from app.models.term import Term

router = APIRouter(
    
    tags=["terms"],
)


@router.get("/")
async def list_terms(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Term).order_by(Term.code))
    rows = result.scalars().all()
    return [{"code": t.code, "name": getattr(t, "name", t.code)} for t in rows]


@router.get("/{term_id}")
async def get_term(term_id: int, db: AsyncSession = Depends(get_db)):
    """
    Get one term row by ID.
    """
    result = await db.execute(
        select(PlanTerm).where(PlanTerm.id == term_id)
    )
    term = result.scalar_one_or_none()

    if term is None:
        raise HTTPException(status_code=404, detail="Term not found")

    return {
        "id": term.id,
        "code": term.term_code,
        "name": term.term_code,
        "plan_id": term.plan_id,
    }