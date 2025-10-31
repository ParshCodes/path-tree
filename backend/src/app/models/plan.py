from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Plan(Base):
    __tablename__ = "plans"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    owner_email: Mapped[str] = mapped_column(String(255), index=True)  # simple owner link
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    program_id: Mapped[str | None] = mapped_column(ForeignKey("programs.id"), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    terms: Mapped[list["PlanTerm"]] = relationship(back_populates="plan", cascade="all, delete-orphan")


class PlanTerm(Base):
    __tablename__ = "plan_terms"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    plan_id: Mapped[int] = mapped_column(ForeignKey("plans.id", ondelete="CASCADE"))
    term_code: Mapped[str] = mapped_column(String(20), index=True)  # e.g., "2025F"

    plan: Mapped[Plan] = relationship(back_populates="terms")
    courses: Mapped[list["PlanCourse"]] = relationship(back_populates="term", cascade="all, delete-orphan")


class PlanCourse(Base):
    __tablename__ = "plan_term_courses"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    term_id: Mapped[int] = mapped_column(ForeignKey("plan_terms.id", ondelete="CASCADE"))
    course_code: Mapped[str] = mapped_column(String(20))  # reference to Course.code (not strict FK to allow free add)

    term: Mapped[PlanTerm] = relationship(back_populates="courses")
