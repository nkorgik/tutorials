from __future__ import annotations

from datetime import datetime
from decimal import Decimal, InvalidOperation

from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

from .repository import ExpenseRepository

router = Router()


def _format_expense_row(row: dict) -> str:
    created_at: datetime = row["created_at"]
    note = row["note"].strip()
    note_display = f" - {note}" if note else ""
    return f"{created_at:%Y-%m-%d %H:%M} - {row['category']} - {row['amount']}{note_display}"


@router.message(Command("start"))
async def handle_start(message: Message) -> None:
    await message.answer(
        "Hi! I can track your spending.\n"
        "Commands:\n"
        "/add 12.50 groceries bought apples\n"
        "/list - show your last entries\n"
        "/total - show the total you have logged"
    )


@router.message(Command("add"))
async def handle_add(message: Message, repo: ExpenseRepository) -> None:
    if message.from_user is None or not message.text:
        return

    parts = message.text.split(maxsplit=3)
    if len(parts) < 3:
        await message.answer("Usage: /add &lt;amount&gt; &lt;category&gt; [note]")
        return

    _, amount_raw, category, *rest = parts
    note = rest[0] if rest else ""

    try:
        amount = Decimal(amount_raw)
    except InvalidOperation:
        await message.answer("Amount should be a number, for example 9.99")
        return

    record = await repo.add_expense(
        user_id=message.from_user.id,
        amount=amount,
        category=category,
        note=note,
    )
    await message.answer(
        f"Added {record['amount']} in {record['category']} at {record['created_at']:%H:%M}."
    )


@router.message(Command("list"))
async def handle_list(message: Message, repo: ExpenseRepository) -> None:
    if message.from_user is None:
        return

    rows = await repo.list_expenses(message.from_user.id, limit=10)
    if not rows:
        await message.answer("No expenses yet. Add one with /add 12.00 groceries")
        return

    lines = [_format_expense_row(row) for row in rows]
    await message.answer("Your recent expenses:\n" + "\n".join(lines))


@router.message(Command("total"))
async def handle_total(message: Message, repo: ExpenseRepository) -> None:
    if message.from_user is None:
        return

    total = await repo.total_spent(message.from_user.id)
    await message.answer(f"Total logged: {total}")
