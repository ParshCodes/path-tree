# Backend-Frontend Integration for Program of Study Page

## What Was Done

Successfully integrated the backend FastAPI server with the frontend Next.js program-of-study page.

## Changes Made

### Frontend (`frontend/`)

1. **Environment Configuration** (`.env.local`)
   - Added `NEXT_PUBLIC_API_URL=http://localhost:8000` to connect to backend

2. **API Client** (`src/lib/api.ts`)
   - Created reusable API client with typed methods
   - Includes error handling with `ApiError` class
   - Methods for fetching programs, streams, and requirements

3. **TypeScript Types** (`src/types/program.ts`)
   - Defined interfaces matching backend schemas: `Program`, `Stream`, `ProgramRequirement`
   - Kept frontend display types: `Course`, `SubRequirement`, `Requirement`

4. **Updated Program of Study Page** (`src/app/program-of-study/page.tsx`)
   - Added state management for API data
   - Fetches programs list on component mount
   - Program selector dropdown to switch between programs
   - Loading and error states
   - Integrated with backend API while maintaining existing UI

### Backend (`backend/`)

1. **Environment Configuration** (`.env`)
   - Added CORS origins to allow frontend at `http://localhost:3000`
   - Configured database and JWT settings

## How to Run

### 1. Start the Backend Server

```powershell
cd backend
# Install dependencies (if not already installed)
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

### 2. Start the Frontend Server

```powershell
cd frontend
# Install dependencies (if not already installed)
npm install

# Run the Next.js development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. View the Program of Study Page

Navigate to: `http://localhost:3000/program-of-study`

## API Endpoints Used

- `GET /programs` - List all programs
- `GET /programs/{program_id}` - Get program details
- `GET /programs/{program_id}/streams` - Get program streams
- `GET /programs/{program_id}/requirements` - Get program requirements

## Current State

The integration is functional and displays:
- Program selector dropdown populated from backend
- API calls to fetch program data
- Error handling for failed API requests
- Loading states during data fetching
- Mock audit data (until backend provides full audit structure)

## Next Steps (Optional)

1. Update backend to return complete audit data structure
2. Add authentication flow for user-specific audit data
3. Implement student plan tracking
4. Add ability to update/save program selections
5. Connect other frontend pages (plans, courses) to backend

## Database Setup

Ensure PostgreSQL is running with the database configured in `.env`:
- Database: `course_planner`
- User: `postgres`
- Password: `postgres`
- Host: `localhost`
- Port: `5432`

Run migrations/initialization as needed for your backend schema.
