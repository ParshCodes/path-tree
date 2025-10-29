from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.program import Program, Stream, ProgramRequirement

def list_programs(db: Session, q: str | None, level: str | None):
    stmt = select(Program)
    if q:
        stmt = stmt.filter(Program.name.ilike(f"%{q}%"))
    if level:
        stmt = stmt.filter(Program.level == level)
    return db.execute(stmt).scalars().all()

def get_program(db: Session, program_id: str):
    return db.get(Program, program_id)

def list_streams(db: Session, program_id: str):
    return db.execute(select(Stream).where(Stream.program_id == program_id)).scalars().all()

def list_requirements(db: Session, program_id: str, stream_id: str | None):
    stmt = select(ProgramRequirement).where(ProgramRequirement.program_id == program_id)
    if stream_id is not None:
        stmt = stmt.where(ProgramRequirement.stream_id == stream_id)
    return db.execute(stmt).scalars().all()
