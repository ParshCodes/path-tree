# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app
ENV PYTHONPATH=/app:/app/src

# Install system deps if needed (psycopg, asyncpg, etc.)
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Copy poetry/requirements first for caching
COPY requirements.txt ./

# If you use poetry:
# RUN pip install poetry && poetry config virtualenvs.create false && poetry install --no-dev

# If you use requirements.txt instead:
RUN if [ -f "requirements.txt" ]; then pip install --no-cache-dir -r requirements.txt; fi

# Copy the rest of backend code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000"]