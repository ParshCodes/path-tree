from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.repository.completion import CompletionRepository
from app.schemas.completion import CompletionCreate, CompletionOut, CompletionUpdate
from app.schemas.account import AccountOut

router = APIRouter()


@router.get("", response_model=list[CompletionOut])
async def list_completions(
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    """Get all course completions for the current user."""
    repo = CompletionRepository(db)
    completions = await repo.list_completions(me.email)
    return [CompletionOut.model_validate(c, from_attributes=True) for c in completions]


@router.post("", response_model=CompletionOut, status_code=status.HTTP_201_CREATED)
async def create_completion(
    payload: CompletionCreate,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    """Add a new course completion record."""
    repo = CompletionRepository(db)
    completion = await repo.create_completion(
        student_email=me.email,
        course_code=payload.course_code,
        status=payload.status,
        grade=payload.grade,
        term_code=payload.term_code,
        units_earned=payload.units_earned,
    )
    return CompletionOut.model_validate(completion, from_attributes=True)


@router.get("/{completion_id}", response_model=CompletionOut)
async def get_completion(
    completion_id: int,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    """Get a specific completion record."""
    repo = CompletionRepository(db)
    completion = await repo.get(completion_id)
    if not completion or completion.student_email != me.email:
        raise HTTPException(status_code=404, detail="Completion not found")
    return CompletionOut.model_validate(completion, from_attributes=True)


@router.put("/{completion_id}", response_model=CompletionOut)
async def update_completion(
    completion_id: int,
    payload: CompletionUpdate,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    """Update an existing completion record."""
    repo = CompletionRepository(db)
    completion = await repo.get(completion_id)
    if not completion or completion.student_email != me.email:
        raise HTTPException(status_code=404, detail="Completion not found")

    updated = await repo.update_completion(
        completion=completion,
        status=payload.status,
        grade=payload.grade,
        term_code=payload.term_code,
        units_earned=payload.units_earned,
    )
    return CompletionOut.model_validate(updated, from_attributes=True)


@router.delete("/{completion_id}", status_code=204)
async def delete_completion(
    completion_id: int,
    db: AsyncSession = Depends(get_db),
    me: AccountOut = Depends(get_current_user),
):
    """Delete a completion record."""
    repo = CompletionRepository(db)
    completion = await repo.get(completion_id)
    if not completion or completion.student_email != me.email:
        raise HTTPException(status_code=404, detail="Completion not found")
    
    await repo.delete(completion_id)
    return None
