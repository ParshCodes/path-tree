from fastapi import APIRouter

from app.routes import status
from app.routes import auth

api_router = APIRouter()

api_router.include_router(status.router, prefix="/status", tags=["status"])
api_router.include_router(auth.router, prefix="/user", tags=["auth"])
