from pydantic import BaseModel, Field
from typing import Optional


class CompletionCreate(BaseModel):
    course_code: str = Field(min_length=2, max_length=20)
    status: str = Field(pattern="^(completed|in-progress|planned)$")
    grade: Optional[str] = Field(default=None, max_length=5)
    term_code: Optional[str] = Field(default=None, max_length=20)
    units_earned: Optional[int] = Field(default=None, ge=0, le=10)


class CompletionUpdate(BaseModel):
    status: Optional[str] = Field(default=None, pattern="^(completed|in-progress|planned)$")
    grade: Optional[str] = Field(default=None, max_length=5)
    term_code: Optional[str] = Field(default=None, max_length=20)
    units_earned: Optional[int] = Field(default=None, ge=0, le=10)


class CompletionOut(BaseModel):
    id: int
    student_email: str
    course_code: str
    status: str
    grade: Optional[str] = None
    term_code: Optional[str] = None
    units_earned: Optional[int] = None
