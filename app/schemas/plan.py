from pydantic import BaseModel
from typing import Any, Dict, List

class PlannedCourseCreate(BaseModel):
    course_id: str
    status: str | None = "planned"

class PlannedCourseOut(BaseModel):
    id: str
    term_id: str
    course_id: str
    status: str

class TermCreate(BaseModel):
    term_code: str
    max_units: int | None = None

class TermUpdate(BaseModel):
    max_units: int | None = None

class TermOut(BaseModel):
    id: str
    plan_id: str
    term_code: str
    max_units: int | None = None
    courses: List[PlannedCourseOut] = []

class PlanCreate(BaseModel):
    program_id: str
    catalog_year: str
    name: str | None = None

class PlanUpdate(BaseModel):
    name: str | None = None
    settings: Dict[str, Any] | None = None

class PlanOut(BaseModel):
    id: str
    student_profile_id: str
    program_id: str
    catalog_year: str
    name: str
    settings: Dict[str, Any]
    terms: List[TermOut] = []
