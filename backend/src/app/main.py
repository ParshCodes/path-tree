import logging
from time import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.database import init_db, close_db
from app.core.settings import settings

logger = logging.getLogger("uvicorn")

app = FastAPI(title=settings.app_name, version=settings.app_version)

# CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple logging middleware
@app.middleware("http")
async def add_timing(request: Request, call_next):
    start = time()
    response = await call_next(request)
    duration = (time() - start) * 1000
    logger.info("%s %s -> %s in %.2fms", request.method, request.url.path, response.status_code, duration)
    response.headers["X-Process-Time-ms"] = f"{duration:.2f}"
    return response


@app.on_event("startup")
async def on_startup():
    await init_db()
    logger.info("Database initialized.")


@app.on_event("shutdown")
async def on_shutdown():
    await close_db()
    logger.info("Database disposed.")


app.include_router(api_router)
