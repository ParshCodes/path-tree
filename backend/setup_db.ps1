# PostgreSQL Setup Script
# This script will create the course_planner database and user

Write-Host "PostgreSQL Database Setup" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green
Write-Host ""

# Prompt for postgres password
$postgresPassword = Read-Host "Enter your PostgreSQL 'postgres' user password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($postgresPassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Set environment variable for psql
$env:PGPASSWORD = $plainPassword

# Path to psql (adjust if needed)
$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

if (-not (Test-Path $psqlPath)) {
    $psqlPath = "C:\Program Files\PostgreSQL\16\bin\psql.exe"
}

if (-not (Test-Path $psqlPath)) {
    $psqlPath = "C:\Program Files\PostgreSQL\13\bin\psql.exe"
}

if (-not (Test-Path $psqlPath)) {
    Write-Host "ERROR: Could not find psql.exe. Please install PostgreSQL." -ForegroundColor Red
    exit 1
}

Write-Host "Found PostgreSQL at: $psqlPath" -ForegroundColor Cyan
Write-Host ""

# Create user and database
Write-Host "Creating database and user..." -ForegroundColor Yellow

$sqlCommands = @"
-- Drop existing if needed
DROP DATABASE IF EXISTS course_planner;
DROP USER IF EXISTS course_planner;

-- Create user
CREATE USER course_planner WITH PASSWORD 'course_planner';

-- Create database
CREATE DATABASE course_planner OWNER course_planner;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE course_planner TO course_planner;
"@

# Execute SQL commands
$sqlCommands | & $psqlPath -U postgres -h localhost -p 5432

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! Database setup complete." -ForegroundColor Green
    Write-Host ""
    Write-Host "Database Details:" -ForegroundColor Cyan
    Write-Host "  Host: localhost" -ForegroundColor White
    Write-Host "  Port: 5432" -ForegroundColor White
    Write-Host "  Database: course_planner" -ForegroundColor White
    Write-Host "  Username: course_planner" -ForegroundColor White
    Write-Host "  Password: course_planner" -ForegroundColor White
    Write-Host ""
    
    # Test connection with new user
    Write-Host "Testing connection with course_planner user..." -ForegroundColor Yellow
    $env:PGPASSWORD = "course_planner"
    & $psqlPath -U course_planner -h localhost -p 5432 -d course_planner -c "SELECT version();"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Connection test PASSED! You're ready to run the backend." -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "ERROR: Failed to setup database. Please check the error messages above." -ForegroundColor Red
    Write-Host "Make sure you entered the correct postgres password." -ForegroundColor Yellow
}

# Clear password from environment
$env:PGPASSWORD = $null
