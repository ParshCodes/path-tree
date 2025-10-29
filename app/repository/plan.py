import uuid
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select, and_
from app.models.plan import StudentProfile, DegreePlan, Term, PlannedCourse

def _ensure_default_student(db: Session) -> StudentProfile:
    stu = db.execute(select(StudentProfile).limit(1)).scalars().first()
    if not stu:
        stu = StudentProfile(name="Demo Student", major_program_id=None, catalog_year=None)
        db.add(stu); db.commit(); db.refresh(stu)
    return stu

def list_plans(db: Session):
    stu = _ensure_default_student(db)
    return db.execute(
        select(DegreePlan)
        .where(DegreePlan.student_profile_id == stu.id)
        .options(joinedload(DegreePlan.terms).joinedload(Term.courses))
    ).scalars().all()

def create_plan(db: Session, program_id: str, catalog_year: str, name: str | None):
    stu = _ensure_default_student(db)
    row = DegreePlan(student_profile_id=stu.id, program_id=program_id, catalog_year=catalog_year, name=name or "My Plan")
    db.add(row); db.commit(); db.refresh(row)
    return row

def get_plan(db: Session, plan_id: str):
    return db.execute(
        select(DegreePlan)
        .where(DegreePlan.id == uuid.UUID(plan_id))
        .options(joinedload(DegreePlan.terms).joinedload(Term.courses))
    ).scalars().first()

def update_plan(db: Session, plan_id: str, name: str | None, settings: dict | None):
    row = db.get(DegreePlan, uuid.UUID(plan_id))
    if not row: return None
    if name is not None: row.name = name
    if settings is not None: row.settings = settings
    db.commit(); db.refresh(row)
    return row

def delete_plan(db: Session, plan_id: str) -> bool:
    row = db.get(DegreePlan, uuid.UUID(plan_id))
    if not row: return False
    db.delete(row); db.commit()
    return True

def add_term(db: Session, plan_id: str, term_code: str, max_units: int | None):
    pid = uuid.UUID(plan_id)
    exists = db.execute(select(Term).where(and_(Term.plan_id == pid, Term.term_code == term_code))).scalar_one_or_none()
    if exists: return None, "duplicate"
    row = Term(plan_id=pid, term_code=term_code, max_units=max_units)
    db.add(row); db.commit(); db.refresh(row)
    return row, None

def update_term(db: Session, term_id: str, max_units: int | None):
    row = db.get(Term, uuid.UUID(term_id))
    if not row: return None
    if max_units is not None: row.max_units = max_units
    db.commit(); db.refresh(row)
    return row

def delete_term(db: Session, plan_id: str, term_id: str) -> bool:
    row = db.get(Term, uuid.UUID(term_id))
    if not row or str(row.plan_id) != plan_id: return False
    db.delete(row); db.commit()
    return True

def add_planned(db: Session, term_id: str, course_id: str, status: str | None):
    tid = uuid.UUID(term_id)
    dup = db.execute(select(PlannedCourse).where(and_(PlannedCourse.term_id == tid, PlannedCourse.course_id == course_id))).scalar_one_or_none()
    if dup: return None, "duplicate"
    row = PlannedCourse(term_id=tid, course_id=course_id, status=status or "planned")
    db.add(row); db.commit(); db.refresh(row)
    return row, None

def move_or_update_planned(db: Session, planned_id: str, status: str | None, move_to_term_id: str | None):
    row = db.get(PlannedCourse, uuid.UUID(planned_id))
    if not row: return None
    if status: row.status = status
    if move_to_term_id: row.term_id = uuid.UUID(move_to_term_id)
    db.commit(); db.refresh(row)
    return row

def delete_planned(db: Session, plan_id: str, term_id: str, planned_id: str) -> bool:
    row = db.get(PlannedCourse, uuid.UUID(planned_id))
    if not row or str(row.term_id) != term_id: return False
    db.delete(row); db.commit()
    return True
