from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.plan import Plan, PlanTerm, PlanCourse


class PlanRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_plans(self, owner_email: str) -> list[Plan]:
        stmt = select(Plan).where(Plan.owner_email == owner_email)
        res = await self.db.execute(stmt)
        return list(res.scalars().all())

    async def create_plan(self, owner_email: str, name: str, program_id: str ) -> Plan:
        plan = Plan(owner_email=owner_email, name=name, program_id=program_id)
        self.db.add(plan)
        await self.db.flush()
        return plan

    async def get(self, plan_id: int) -> Plan :
        return await self.db.get(Plan, plan_id)

    async def update_name(self, plan: Plan, name: str) -> Plan:
        plan.name = name
        await self.db.flush()
        return plan

    async def delete(self, plan_id: int) :
        stmt = delete(Plan).where(Plan.id == plan_id)
        await self.db.execute(stmt)

    # --- terms ---
    async def list_terms(self, plan_id: int) -> list[PlanTerm]:
        stmt = (
            select(PlanTerm)
            .where(PlanTerm.plan_id == plan_id)
            .order_by(PlanTerm.term_code)
            .options(selectinload(PlanTerm.courses))
        )
        res = await self.db.execute(stmt)
        return list(res.scalars().all())

    async def add_term(self, plan_id: int, term_code: str) -> PlanTerm:
        term = PlanTerm(plan_id=plan_id, term_code=term_code)
        self.db.add(term)
        await self.db.flush()
        # Refresh to load the courses relationship
        await self.db.refresh(term, attribute_names=["courses"])
        return term

    async def delete_term(self, term_id: int):
        stmt = delete(PlanTerm).where(PlanTerm.id == term_id)
        await self.db.execute(stmt)

    # --- courses ---
    async def add_course(self, term_id: int, course_code: str) -> PlanCourse:
        pc = PlanCourse(term_id=term_id, course_code=course_code)
        self.db.add(pc)
        await self.db.flush()
        return pc

    async def remove_course(self, term_id: int, course_code: str) :
        stmt = delete(PlanCourse).where(
            PlanCourse.term_id == term_id,
            PlanCourse.course_code == course_code,
        )
        await self.db.execute(stmt)
