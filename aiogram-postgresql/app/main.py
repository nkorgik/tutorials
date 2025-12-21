from __future__ import annotations

import asyncio
import logging

from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties

from .config import load_settings
from .db import close_pool, create_pool, ensure_schema
from .handlers import router
from .repository import ExpenseRepository


async def main() -> None:
    logging.basicConfig(level=logging.INFO)
    settings = load_settings()

    bot = Bot(
        token=settings.bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    dp = Dispatcher()
    dp.include_router(router)

    pool = await create_pool(settings.db)
    await ensure_schema(pool)
    repo = ExpenseRepository(pool)

    try:
        await dp.start_polling(
            bot,
            allowed_updates=dp.resolve_used_update_types(),
            drop_pending_updates=settings.drop_pending_updates,
            timeout=settings.polling_timeout,
            repo=repo,
        )
    finally:
        await close_pool(pool)
        await bot.session.close()


if __name__ == "__main__":
    asyncio.run(main())
