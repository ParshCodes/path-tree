from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.repository.plan import PlanRepository


class PlanService:
    def __init__(self, db: AsyncSession):
        self.repo = PlanRepository(db)

    async def list_plans(self, owner_email: str):
        return await self.repo.list_plans(owner_email)

    async def create_plan(self, owner_email: str, name: str, program_id: str | None):
        return await self.repo.create_plan(owner_email, name, program_id)

    async def get_owned_plan(self, plan_id: int, owner_email: str):
        plan = await self.repo.get(plan_id)
        if not plan or plan.owner_email != owner_email:
            raise HTTPException(status_code=404, detail="Plan not found")
        return plan

    async def update_name(self, plan_id: int, owner_email: str, name: str):
        plan = await self.get_owned_plan(plan_id, owner_email)
        return await self.repo.update_name(plan, name)

    async def delete(self, plan_id: int, owner_email: str):
        await self.get_owned_plan(plan_id, owner_email)
        await self.repo.delete(plan_id)

    async def list_terms(self, plan_id: int, owner_email: str):
        await self.get_owned_plan(plan_id, owner_email)
        return await self.repo.list_terms(plan_id)

    async def add_term(self, plan_id: int, owner_email: str, term_code: str):
        await self.get_owned_plan(plan_id, owner_email)
        return await self.repo.add_term(plan_id, term_code)

    async def add_course(self, plan_id: int, owner_email: str, term_id: int, course_code: str):
        await self.get_owned_plan(plan_id, owner_email)
        term_ids = {t.id for t in await self.repo.list_terms(plan_id)}
        if term_id not in term_ids:
            raise HTTPException(status_code=404, detail="Term not found")
        return await self.repo.add_course(term_id, course_code)

    async def remove_course(self, plan_id: int, owner_email: str, term_id: int, course_code: str):
        await self.get_owned_plan(plan_id, owner_email)
        term_ids = {t.id for t in await self.repo.list_terms(plan_id)}
        if term_id not in term_ids:
            raise HTTPException(status_code=404, detail="Term not found")
        await self.repo.remove_course(term_id, course_code)
