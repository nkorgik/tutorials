from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Optional

from dotenv import load_dotenv


@dataclass
class DbConfig:
    user: str
    password: str
    database: str
    host: str = "db"
    port: int = 5432

    @property
    def dsn(self) -> str:
        return f"postgresql://{self.user}:{self.password}@{self.host}:{self.port}/{self.database}"


@dataclass
class Settings:
    bot_token: str
    db: DbConfig
    drop_pending_updates: bool = True
    polling_timeout: int = 30


def load_settings(env_file: Optional[str] = ".env") -> Settings:
    """Load environment variables and build strongly typed settings."""
    if env_file:
        load_dotenv(env_file)

    bot_token = os.getenv("BOT_TOKEN")
    if not bot_token:
        raise RuntimeError("BOT_TOKEN is required to start the bot")

    db = DbConfig(
        user=os.getenv("POSTGRES_USER", "aiogram"),
        password=os.getenv("POSTGRES_PASSWORD", "aiogram"),
        database=os.getenv("POSTGRES_DB", "aiogram"),
        host=os.getenv("POSTGRES_HOST", os.getenv("DB_HOST", "db")),
        port=int(os.getenv("POSTGRES_PORT", "5432")),
    )

    return Settings(
        bot_token=bot_token,
        db=db,
        drop_pending_updates=os.getenv("DROP_PENDING_UPDATES", "true").lower()
        in {"1", "true", "yes"},
        polling_timeout=int(os.getenv("BOT_POLLING_TIMEOUT", "30")),
    )
