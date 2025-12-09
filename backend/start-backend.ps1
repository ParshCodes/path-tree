# Start backend server with correct database settings
Write-Host "Starting backend server..." -ForegroundColor Green

# Clear any problematic environment variables
Remove-Item Env:\DATABASE_URL -ErrorAction SilentlyContinue
Remove-Item Env:\POSTGRES_HOST -ErrorAction SilentlyContinue
Remove-Item Env:\POSTGRES_PORT -ErrorAction SilentlyContinue
Remove-Item Env:\POSTGRES_USER -ErrorAction SilentlyContinue
Remove-Item Env:\POSTGRES_PASSWORD -ErrorAction SilentlyContinue
Remove-Item Env:\POSTGRES_DB -ErrorAction SilentlyContinue

# Set database connection variables explicitly
$env:POSTGRES_HOST = "localhost"
$env:POSTGRES_PORT = "5432"
$env:POSTGRES_USER = "course_planner"
$env:POSTGRES_PASSWORD = "course_planner"
$env:POSTGRES_DB = "course_planner"

# Set correct Python path
$env:PYTHONPATH = "C:\Users\mario\Documents\GitHub\path-tree\backend\src"

# Navigate to backend/src directory
Set-Location "C:\Users\mario\Documents\GitHub\path-tree\backend\src"

Write-Host "Database settings:" -ForegroundColor Cyan
Write-Host "  Host: $env:POSTGRES_HOST" -ForegroundColor Cyan
Write-Host "  Port: $env:POSTGRES_PORT" -ForegroundColor Cyan
Write-Host "  User: $env:POSTGRES_USER" -ForegroundColor Cyan
Write-Host "  Database: $env:POSTGRES_DB" -ForegroundColor Cyan
Write-Host ""

# Start uvicorn
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
