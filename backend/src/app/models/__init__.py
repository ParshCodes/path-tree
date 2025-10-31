# Ensure metadata is registered by importing all models
from app.core.database import Base  # noqa: F401
from app.models.account import Account  # noqa: F401
from app.models.program import Program, Stream, ProgramRequirement  # noqa: F401
from app.models.course import Course  # noqa: F401
from app.models.plan import Plan, PlanTerm, PlanCourse  # noqa: F401
