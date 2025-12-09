"""
Quick script to test database connection and display settings.
Run this to verify your PostgreSQL connection works.
"""
import sys
import os

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from app.core.settings import Settings

settings = Settings()

print("=" * 60)
print("DATABASE CONNECTION SETTINGS")
print("=" * 60)
print(f"Host: {settings.POSTGRES_HOST}")
print(f"Port: {settings.POSTGRES_PORT}")
print(f"Database: {settings.POSTGRES_DB}")
print(f"User: {settings.POSTGRES_USER}")
print(f"Password: {'*' * len(settings.POSTGRES_PASSWORD)}")
print(f"\nFull URL: {settings.async_database_url}")
print("=" * 60)

# Try to connect
print("\nTesting connection...")
import asyncio
import asyncpg

async def test_connection():
    try:
        conn = await asyncpg.connect(
            host=settings.POSTGRES_HOST,
            port=settings.POSTGRES_PORT,
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            database=settings.POSTGRES_DB,
        )
        print("✅ Connection successful!")
        version = await conn.fetchval('SELECT version()')
        print(f"PostgreSQL version: {version}")
        await conn.close()
        return True
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

if __name__ == "__main__":
    success = asyncio.run(test_connection())
    sys.exit(0 if success else 1)
