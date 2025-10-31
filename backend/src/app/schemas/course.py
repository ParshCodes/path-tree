from pydantic import BaseModel


class CourseOut(BaseModel):
    code: str
    title: str
    units: int
