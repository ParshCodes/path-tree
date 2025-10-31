# Course Planner API

FastAPI backend for a student degree planning tool. It exposes endpoints to manage programs, streams, degree plans, terms, and planned courses. The current implementation ships with **stub/in-memory repositories** so you can demo the API without a database. You can later switch the repositories to PostgreSQL without changing the HTTP routes.

---

## Features

- Auth stubs: `/auth/register`, `/auth/login`, `/auth/refresh`
- Profile stub: `/students/me`
- Catalog: `/programs`, `/programs/{id}`, `/programs/{id}/streams`, `/programs/{id}/requirements`
- Planner: `/plans`, `/plans/{id}`, `/plans/{id}/terms`, `/plans/{id}/terms/{termId}/courses`
- Audit + Collaboration stubs: `/plans/{id}/audit`, `/plans/{id}/share-links`
- OpenAPI (Swagger) docs with examples for each request

---

## Tech stack

- **Python** 3.11+  
- **FastAPI** + Uvicorn  
- Layered project structure (routes → services → repository → models)  
- PostgreSQL 

---

## Project layout

```
backend/
├── pyproject.toml
├── README.md
├── .env.example
└── src/app/
    ├── main.py
    ├── api/v1/router.py
    ├── core/
    │   ├── settings.py
    │   ├── database.py
    │   ├── auth.py
    │   └── dependencies.py
    ├── models/
    │   ├── account.py
    │   ├── program.py
    │   ├── plan.py
    │   └── course.py
    ├── repository/
    │   ├── account.py
    │   ├── program.py
    │   └── plan.py
    ├── routes/
    │   ├── auth.py
    │   ├── programs.py
    │   ├── plans.py
    │   └── status.py
    ├── schemas/
    │   ├── account.py
    │   ├── program.py
    │   ├── plan.py
    │   ├── course.py
    │   └── token.py
    ├── services
    │   ├── account.py
    │   ├── program.py
    │   ├── plan.py
```

---

## Getting started

### 1) Create & activate a virtualenv
```bash
python -m venv .venv
# Windows
. .venv/Scripts/activate
# macOS/Linux
source .venv/bin/activate
```

### 2) Install dependencies
If you have a `requirements.txt`, do:
```bash
pip install -r requirements.txt
```
If not, install the basics:
```bash
pip install fastapi uvicorn[standard] pydantic-settings
```
### 3) Configure the .env
```bash
Make sure the .env has the the correct username and password as your postgres.
And you need to create a database named course_planner
```
### 4) Run the API
```bash
python -m uvicorn app.main:app --reload --app-dir backend/src
```

Open the docs: <http://localhost:8000/docs>  
OpenAPI JSON: <http://localhost:8000/openapi.json>

---



## License

Personal/academic use
