from fastapi import APIRouter

from app.routes.status import router as status_router
from app.routes.auth import router as auth_router
from app.routes.programs import router as programs_router
from app.routes.plans import router as plans_router

api_router = APIRouter()
api_router.include_router(status_router, prefix="/status", tags=["status"])
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(programs_router, prefix="/programs", tags=["programs"])
api_router.include_router(plans_router, prefix="/plans", tags=["plans"])
