from pydantic import BaseModel, Field


class PlanCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    program_id: str | None = None


class PlanUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)


class PlanOut(BaseModel):
    id: int
    owner_email: str
    name: str
    program_id: str | None = None


class PlanTermCreate(BaseModel):
    term_code: str = Field(min_length=3, max_length=20)


class PlanTermOut(BaseModel):
    id: int
    plan_id: int
    term_code: str


class PlanCourseCreate(BaseModel):
    course_code: str = Field(min_length=2, max_length=20)
