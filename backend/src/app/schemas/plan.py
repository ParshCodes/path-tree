from pydantic import BaseModel, Field
from typing import Optional


class PlanCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    program_id: Optional[str] = None


class PlanUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=255)


class PlanOut(BaseModel):
    id: int
    owner_email: str
    name: str
    program_id: Optional[str] = None


class PlanTermCreate(BaseModel):
    term_code: str = Field(min_length=3, max_length=20)


class PlanCourseCreate(BaseModel):
    course_code: str = Field(min_length=2, max_length=20)


class PlanCourseOut(BaseModel):
    id: int
    course_code: str


class PlanTermOut(BaseModel):
    id: int
    plan_id: int
    term_code: str
    courses: list["PlanCourseOut"] = []
