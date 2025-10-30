from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_async_session
from app.schemas.program import ProgramOut, StreamOut, ProgramRequirementOut
from app.repository.program import ProgramRepository

router = APIRouter(prefix="/programs", tags=["programs"])

@router.get("", response_model=List[ProgramOut])
async def list_programs(
    session: AsyncSession = Depends(get_async_session)
):
    """List all available academic programs."""
    repo = ProgramRepository(session)
    return await repo.list_programs()

@router.get("/{program_id}", response_model=ProgramOut)
async def get_program(
    program_id: str,
    session: AsyncSession = Depends(get_async_session)
):
    """Get a specific program by ID."""
    repo = ProgramRepository(session)
    program = await repo.get_program(program_id)
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return program

@router.get("/{program_id}/streams", response_model=List[StreamOut])
async def list_program_streams(
    program_id: str,
    session: AsyncSession = Depends(get_async_session)
):
    """List all streams for a specific program."""
    repo = ProgramRepository(session)
    return await repo.list_program_streams(program_id)

@router.get("/{program_id}/requirements", response_model=List[ProgramRequirementOut])
async def list_program_requirements(
    program_id: str,
    stream_id: str | None = None,
    session: AsyncSession = Depends(get_async_session)
):
    """List all requirements for a specific program, optionally filtered by stream."""
    repo = ProgramRepository(session)
    return await repo.list_program_requirements(program_id, stream_id)
