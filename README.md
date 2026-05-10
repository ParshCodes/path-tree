# CourseCompass — Academic Course Planner

A full-stack web application that helps students plan their entire academic journey — track completed courses, build multi-term degree plans, and run real-time degree audits against their program requirements.

Built with a **FastAPI** backend and a **Next.js 16** frontend, containerized with Docker Compose for one-command local development.

---

## Features

- **Secure Authentication** — JWT access tokens stored in HttpOnly cookies (never exposed to JavaScript), with automatic refresh token rotation
- **Course Completion Tracker** — Log completed, in-progress, and planned courses with grades, term codes, and unit counts
- **Academic Plan Builder** — Create named degree plans, organize courses by term, add or remove courses from each semester
- **Live Degree Audit** — Evaluate plan progress against official program requirements, see exactly which requirements are satisfied and which are missing
- **GPA & Unit Snapshot** — Real-time GPA calculation and unit progress visualized with SVG donut charts
- **Shareable Audit Links** — Generate a shareable URL to a specific plan's audit view
- **Program of Study View** — Collapsible requirement tree with expand/collapse controls, color-coded completion status

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Framework | FastAPI (async) |
| ORM | SQLAlchemy 2.0 (async + `asyncpg`) |
| Database | PostgreSQL |
| Validation | Pydantic v2 |
| Auth | JWT via `python-jose`, Argon2 password hashing via `pwdlib` |
| Migrations | Alembic |
| Runtime | Uvicorn |

### Frontend
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS v4, shadcn/ui, Radix UI |
| Icons | Lucide React |
| Theme | next-themes (dark mode support) |
| Runtime | React 19 |

### Infrastructure
- Docker + Docker Compose (Postgres + backend + frontend in one command)
- Render (backend hosting)
- Vercel (frontend hosting)

---

## Architecture

```
┌─────────────────────┐        ┌──────────────────────────────┐
│   Next.js Frontend  │  HTTP  │       FastAPI Backend         │
│   (Vercel / :3000)  │◄──────►│   (Render / :8000)           │
│                     │        │                              │
│  App Router pages   │        │  /api/v1/auth    (JWT)       │
│  TypeScript types   │        │  /api/v1/plans   (CRUD)      │
│  HttpOnly cookies   │        │  /api/v1/completions         │
│  Auto token refresh │        │  /api/v1/programs            │
└─────────────────────┘        │  /api/v1/courses             │
                               │  /api/v1/terms               │
                               └──────────┬───────────────────┘
                                          │ asyncpg
                                          ▼
                               ┌──────────────────────┐
                               │      PostgreSQL       │
                               │  (Docker / Supabase)  │
                               └──────────────────────┘
```

The backend uses **repository pattern** — routes depend on repository classes, not raw DB sessions. Every request goes through an async SQLAlchemy session, keeping DB I/O non-blocking throughout.

Auth flow: login sets an `HttpOnly; SameSite` cookie on the backend. The frontend never touches the raw JWT — it just sends `credentials: "include"` on every request. If a request returns 401, the frontend automatically attempts a refresh before retrying.

---

## Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recommended)
- Or: Python 3.11+ and Node.js 18+ for local runs

### 1. Clone & configure

```bash
git clone <repo-url>
cd path-tree
cp .env.example .env   # fill in your secrets
```

Minimum required values in `.env`:

```env
SECRET_KEY=your-secure-random-key
REFRESH_SECRET_KEY=your-secure-random-refresh-key
POSTGRES_PASSWORD=yourpassword
```

### 2. Run with Docker

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger docs | http://localhost:8000/docs |

The backend automatically runs migrations and seeds the database with programs, courses, and terms on first startup — no manual setup needed.

### 3. Run without Docker

**Backend:**
```bash
cd backend
pip install -e ".[dev]"
uvicorn src.app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Create account |
| `POST` | `/api/v1/auth/login-json` | Login, sets HttpOnly cookie |
| `POST` | `/api/v1/auth/refresh` | Rotate refresh token |
| `GET` | `/api/v1/auth/me` | Get current user |
| `GET` | `/api/v1/plans` | List user's plans |
| `POST` | `/api/v1/plans` | Create a plan |
| `GET` | `/api/v1/plans/{id}/audit` | Run degree audit |
| `GET` | `/api/v1/completions` | List course completions |
| `GET` | `/api/v1/programs` | List programs |
| `GET` | `/api/v1/courses` | Search course catalog |

Full interactive docs at `/docs` (Swagger UI) or `/redoc`.

---

## Deployment

### Backend (Render)

Set the following environment variables on your Render service:

```
ENVIRONMENT=production
DATABASE_URL=postgresql+asyncpg://...
SECRET_KEY=...
REFRESH_SECRET_KEY=...
CORS_ORIGINS=https://your-vercel-app.vercel.app
```

### Frontend (Vercel)

Set in Vercel project settings:

```
NEXT_PUBLIC_API_BASE_URL=https://your-render-backend.onrender.com
```

---

## Project Structure

```
backend/
  src/app/
    api/v1/router.py       # Route registration
    routes/                # HTTP handlers
    repository/            # DB access layer
    services/              # Business logic
    schemas/               # Pydantic I/O models
    models/                # SQLAlchemy ORM models
    core/                  # Auth, DB, settings, dependencies
    seed.py                # Initial data seeding

frontend/
  src/
    app/                   # Next.js App Router pages
      (auth)/              # Login & register
      profile/             # Plan management
      classes/             # Course completion manager
      program-of-study/    # Degree audit view
    components/            # Shared UI components
    lib/                   # API client, auth helpers
    types/                 # TypeScript type definitions
```

---

## License

Personal / Academic use
