from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.repository.program import ProgramRepository
from app.schemas.program import (
    ProgramOut,
    StreamOut,
    ProgramRequirementOut,
    ProgramCreate,  
)

router = APIRouter()

@router.get("", response_model=list[ProgramOut])
async def list_programs(
    faculty: str  = None,
    level: str  = None,
    db: AsyncSession = Depends(get_db),
):
    repo = ProgramRepository(db)
    progs = await repo.list_programs(faculty, level)
    return [ProgramOut.model_validate(p, from_attributes=True) for p in progs]

@router.get("/{program_id}", response_model=ProgramOut)
async def get_program(program_id: str, db: AsyncSession = Depends(get_db)):
    repo = ProgramRepository(db)
    prog = await repo.get_program(program_id)
    if not prog:
        raise HTTPException(status_code=404, detail="Program not found")
    return ProgramOut.model_validate(prog, from_attributes=True)

@router.get("/{program_id}/streams", response_model=list[StreamOut])
async def list_streams(program_id: str, db: AsyncSession = Depends(get_db)):
    repo = ProgramRepository(db)
    streams = await repo.list_streams(program_id)
    return [StreamOut.model_validate(s, from_attributes=True) for s in streams]

@router.get("/{program_id}/requirements", response_model=list[ProgramRequirementOut])
async def list_requirements(
    program_id: str,
    stream_id: str = None,
    db: AsyncSession = Depends(get_db),
):
    repo = ProgramRepository(db)
    reqs = await repo.list_requirements(program_id, stream_id)
    return [ProgramRequirementOut.model_validate(r, from_attributes=True) for r in reqs]

# NEW: Create a program
@router.post("", response_model=ProgramOut, status_code=status.HTTP_201_CREATED)
async def create_program(payload: ProgramCreate, db: AsyncSession = Depends(get_db)):
    repo = ProgramRepository(db)
    if await repo.get_program(payload.id):
        raise HTTPException(status_code=409, detail="Program already exists")
    p = await repo.create_program(
        id=payload.id,
        title=payload.title,
        faculty=payload.faculty,
        level=payload.level,
    )
    return ProgramOut.model_validate(p, from_attributes=True)
