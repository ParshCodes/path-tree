from fastapi import FastAPI, Request
import logging
from time import time

from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router


app = FastAPI(title="Course Planner API", version="1.0.0")


# Simple CORS setup (development-friendly)
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
	start_time = time()
	response = await call_next(request)
	process_time_ms = (time() - start_time) * 1000
	logging.info(f"{request.method} {request.url.path} completed_in={process_time_ms:.2f}ms status_code={response.status_code}")
	return response


app.include_router(api_router, prefix="/api/v1")
