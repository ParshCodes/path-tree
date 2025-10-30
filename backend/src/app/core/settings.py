from typing import Optional
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Course Planner"
    app_version: str = "0.1.0"

    # JWT Settings
    secret_key: str = Field(
        default="your_secret_key",
        description="The secret key for JWT",
    )
    algorithm: str = Field(
        default="HS256",
        description="The algorithm used for JWT",
    )
    access_token_expire_minutes: int = Field(
        default=30,
        description="Access token expiration time in minutes",
    )

    # Database settings
    POSTGRES_USER: str = Field(
        default="postgres",
        description="PostgreSQL username",
    )
    POSTGRES_PASSWORD: str = Field(
        default="postgres",
        description="PostgreSQL password",
    )
    POSTGRES_HOST: str = Field(
        default="localhost",
        description="PostgreSQL host",
    )
    POSTGRES_PORT: str = Field(
        default="5432",
        description="PostgreSQL port",
    )
    POSTGRES_DB: str = Field(
        default="path_tree",
        description="PostgreSQL database name",
    )
    DATABASE_URL: Optional[str] = None

    @property
    def async_database_url(self) -> str:
        """Get the async database URL for PostgreSQL."""
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()