from pydantic import BaseModel

class CourseOut(BaseModel):
    id: str
    title: str
    units: int
    department: str

class CoursePrereqOut(BaseModel):
    id: str
    target_course_id: str
    prereq_course_id: str
    type: str
    group_tag: str | None = None
    min_grade: float | None = None
