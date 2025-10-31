from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Program(Base):
    __tablename__ = "programs"

    id: Mapped[str] = mapped_column(String(50), primary_key=True)  # e.g., "BS-COMP"
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    faculty: Mapped[str] = mapped_column(String(255), nullable=True)   # e.g., "Engineering"
    level: Mapped[str] = mapped_column(String(50), nullable=True)      # e.g., "UG", "PG"

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    streams: Mapped[list["Stream"]] = relationship(back_populates="program", cascade="all, delete-orphan")
    requirements: Mapped[list["ProgramRequirement"]] = relationship(back_populates="program", cascade="all, delete-orphan")


class Stream(Base):
    __tablename__ = "streams"

    id: Mapped[str] = mapped_column(String(50), primary_key=True)        # e.g., "AI"
    program_id: Mapped[str] = mapped_column(ForeignKey("programs.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    program: Mapped[Program] = relationship(back_populates="streams")
    requirements: Mapped[list["ProgramRequirement"]] = relationship(back_populates="stream", cascade="all, delete-orphan")


class ProgramRequirement(Base):
    __tablename__ = "program_requirements"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    program_id: Mapped[str] = mapped_column(ForeignKey("programs.id", ondelete="CASCADE"))
    stream_id: Mapped[str] = mapped_column(ForeignKey("streams.id", ondelete="CASCADE"), nullable=True)
    rule: Mapped[str] = mapped_column(Text, nullable=False)  # freeform JSON/text for now

    program: Mapped[Program] = relationship(back_populates="requirements")
    stream: Mapped[Stream] = relationship(back_populates="requirements")
