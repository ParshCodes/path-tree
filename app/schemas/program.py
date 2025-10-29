from pydantic import BaseModel

class ProgramOut(BaseModel):
    id: str
    name: str
    level: str
    catalog_year: str

class StreamOut(BaseModel):
    id: str
    program_id: str
    name: str
    description: str | None = None

class ProgramRequirementOut(BaseModel):
    id: str
    program_id: str
    stream_id: str | None = None
    kind: str
    min_units: int
    rule: dict
