from pydantic import BaseModel


class ProgramOut(BaseModel):
    id: str
    title: str
    faculty: str | None = None
    level: str | None = None


class StreamOut(BaseModel):
    id: str
    program_id: str
    name: str


class ProgramRequirementOut(BaseModel):
    id: int
    program_id: str
    stream_id: str | None = None
    rule: str


class ProgramCreate(BaseModel):
    id: str
    title: str
    faculty: str | None = None
    level: str | None = None
