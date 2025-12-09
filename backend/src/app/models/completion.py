from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Completion(Base):
    """
    Tracks courses that a student has completed, is currently taking, or plans to take.
    """
    __tablename__ = "completions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_email: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    course_code: Mapped[str] = mapped_column(String(20), nullable=False)  # e.g., "EE-101"
    
    # Status: "completed", "in-progress", "planned"
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="planned")
    
    # Grade: "A", "A-", "B+", "B", etc., or null if in-progress/planned
    grade: Mapped[str | None] = mapped_column(String(5), nullable=True)
    
    # Term when taken/taking/will-take: e.g., "Fall 2023", "Spring 2024"
    term_code: Mapped[str | None] = mapped_column(String(20), nullable=True)
    
    # Units earned (usually matches course units, but can differ for repeated courses)
    units_earned: Mapped[int | None] = mapped_column(Integer, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
