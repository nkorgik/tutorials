from __future__ import annotations

from decimal import Decimal

import asyncpg


class ExpenseRepository:
    def __init__(self, pool: asyncpg.Pool):
        self._pool = pool

    async def add_expense(
        self, user_id: int, amount: Decimal, category: str, note: str = ""
    ) -> asyncpg.Record:
        return await self._pool.fetchrow(
            """
            INSERT INTO expenses (user_id, amount, category, note)
            VALUES ($1, $2, $3, $4)
            RETURNING id, amount, category, note, created_at
            """,
            user_id,
            amount,
            category,
            note,
        )

    async def list_expenses(
        self, user_id: int, limit: int = 10
    ) -> list[asyncpg.Record]:
        return await self._pool.fetch(
            """
            SELECT amount, category, note, created_at
            FROM expenses
            WHERE user_id = $1
            ORDER BY created_at DESC
            LIMIT $2
            """,
            user_id,
            limit,
        )

    async def total_spent(self, user_id: int) -> Decimal:
        row = await self._pool.fetchrow(
            "SELECT COALESCE(SUM(amount), 0) AS total FROM expenses WHERE user_id = $1",
            user_id,
        )
        return row["total"]
