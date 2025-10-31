from typing import Optional
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = Field(default="Course Planner", description="App name")
    app_version: str = Field(default="1.0.0", description="App version")

    # JWT
    secret_key: str = Field(default="change_me", description="JWT secret key")
    algorithm: str = Field(default="HS256", description="JWT algorithm")
    access_token_expire_minutes: int = Field(default=30)
    refresh_token_expire_minutes: int = Field(default=60 * 24 * 30)  # 30 days

    # CORS
    cors_origins: str = Field(default="*", description="Comma-separated origins")


    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "course_planner"

 
    DATABASE_URL: Optional[str] = None

    @property
    def async_database_url(self) -> str:
        """Return async SQLAlchemy URL for Postgres."""
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return (
            "postgresql+asyncpg://"
            f"{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
