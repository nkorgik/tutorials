from __future__ import annotations

import asyncpg

from .config import DbConfig

CREATE_EXPENSES_TABLE = """
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    category TEXT NOT NULL,
    note TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
"""


async def create_pool(db: DbConfig) -> asyncpg.Pool:
    return await asyncpg.create_pool(
        user=db.user,
        password=db.password,
        database=db.database,
        host=db.host,
        port=db.port,
        command_timeout=60,
    )


async def ensure_schema(pool: asyncpg.Pool) -> None:
    async with pool.acquire() as conn:
        await conn.execute(CREATE_EXPENSES_TABLE)


async def close_pool(pool: asyncpg.Pool) -> None:
    await pool.close()
