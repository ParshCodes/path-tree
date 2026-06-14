# Path Tree — Academic Course Planner

> Plan your classes. Visualize your path. Graduate with confidence.

Path Tree is a full-stack academic planning tool built for engineering students. You can track every course you've taken, map out your remaining semesters, and run a live degree audit that tells you exactly where you stand against your program requirements — all in one place.

**Live demo:** [path-tree-five.vercel.app](https://path-tree-five.vercel.app)

---

## What it does

- **Course tracker** — Log completed, in-progress, and planned courses with grades, term codes, and unit counts. GPA is calculated automatically.
- **Degree plans** — Build named multi-term plans, assign courses to each semester, and reorganize as your schedule changes.
- **Live degree audit** — See exactly which program requirements you've satisfied and which are still missing, based on your actual completions.
- **GPA & unit snapshot** — Visual donut charts show your completed vs. remaining units and your running GPA at a glance.
- **Shareable audit links** — Generate a URL that lets anyone view your degree audit without needing an account.
- **Dark mode** — Because no one should have to stare at a white screen at 2am before finals.

---

## Tech stack

### Backendss
| | |
|---|---|
| Framework | FastAPI (fully async) |
| Database | PostgreSQL via SQLAlchemy 2.0 + asyncpg |
| Auth | JWT access + refresh tokens, Argon2 password hashing |
| Validation | Pydantic v2 |
| Migrations | Alembic |
| Runtime | Uvicorn on Python 3.11 |

### Frontend
| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS v4, shadcn/ui, Radix UI primitives |
| State | React 19 + shared AuthContext |
| Icons | Lucide React |

### Infrastructure
| | |
|---|---|
| Frontend hosting | Vercel |
| Backend hosting | Render (Docker) |
| Database hosting | Render PostgreSQL |
| Local dev | Docker Compose — one command starts everything |

---

## How the auth works

One of the trickier parts of this project was getting secure cross-origin authentication to work properly between Vercel and Render. Here's the approach:

```
Browser
  │
  ▼
Next.js on Vercel  ──── /api/proxy/[...path] ────►  FastAPI on Render
  │                        (server-side fetch)               │
  │◄──────────────── Set-Cookie forwarded back ──────────────┘
  │
  └── Cookie stored on vercel.app domain (same-origin, no cross-origin issues)
```

Instead of the browser calling Render directly (which causes cross-origin cookie headaches), every API request goes through a Next.js Route Handler (`/api/proxy/*`) that forwards it server-side to Render. The `Set-Cookie` header from Render is forwarded back through the proxy, so the browser stores the auth cookie on the Vercel domain. From then on, every request carries the cookie naturally.

On the backend, access tokens live in `HttpOnly` cookies — never in `localStorage`, never accessible to JavaScript. A separate refresh token handles silent re-authentication when the access token expires.

---

## Running locally

### With Docker (recommended)

```bash
git clone <repo-url>
cd path-tree
cp .env.example .env   # add your secrets
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger docs | http://localhost:8000/docs |

The backend seeds itself on first boot — programs, courses, and terms are all created automatically.

### Without Docker

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn src.app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

The minimum you need in `.env`:
```
SECRET_KEY=any-long-random-string
REFRESH_SECRET_KEY=a-different-long-random-string
POSTGRES_PASSWORD=yourpassword
```

---

## API reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create account |
| `POST` | `/auth/login-json` | Login — sets HttpOnly cookie |
| `POST` | `/auth/refresh` | Rotate refresh token |
| `GET` | `/auth/me` | Get current user |
| `GET` | `/plans` | List your degree plans |
| `POST` | `/plans` | Create a plan |
| `GET` | `/plans/{id}/audit` | Run degree audit for a plan |
| `GET` | `/completions` | List your course completions |
| `GET` | `/programs` | Browse programs |
| `GET` | `/courses` | Search the course catalog |

Full interactive docs (Swagger UI) available at `/docs` when running locally.

---

## Deploying your own

#### Backend on Render

Create a Web Service, point it at the `backend/` folder, set runtime to **Docker**, and add these env vars:

```
DATABASE_URL                = postgresql+asyncpg://<your-render-db-url>
SECRET_KEY                  = <run: python -c "import secrets; print(secrets.token_hex(32))">
REFRESH_SECRET_KEY          = <run again for a different value>
ENVIRONMENT                 = production
CORS_ORIGINS                = https://your-app.vercel.app
ALGORITHM                   = HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS   = 30
```

#### Frontend on Vercel

Import the repo, set **Root Directory** to `frontend`, add one env var:

```
NEXT_PUBLIC_API_BASE_URL = https://your-render-backend.onrender.com
```

> Render's free tier sleeps after inactivity — first request after a cold start takes ~30 seconds. Upgrade to a paid instance or use an uptime pinger if that bothers you.

---

## Project structure

```
backend/src/app/
├── routes/          HTTP route handlers
├── repository/      Database access layer (repository pattern)
├── services/        Business logic
├── schemas/         Pydantic request/response models
├── models/          SQLAlchemy ORM models
├── core/            Auth, DB engine, settings, dependencies
└── seed.py          Startup data seeding

frontend/src/
├── app/
│   ├── api/proxy/   Next.js route handler — proxies all requests to Render
│   ├── (auth)/      Login & register pages
│   ├── profile/     Plan management dashboard
│   ├── classes/     Course completion manager
│   └── program-of-study/  Degree audit view
├── components/      Shared UI components + Navbar
├── contexts/        AuthContext — global auth state
├── lib/             API client, auth helpers
└── types/           TypeScript type definitions
```

---

## License

Personal / Academic use
