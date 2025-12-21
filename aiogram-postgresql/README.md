## Financial tracking bot (Aiogram 3 + PostgreSQL)

This project is a minimal Telegram bot that records expenses in PostgreSQL. It demonstrates an **aiogram 3** workflow wired to a real database via Docker Compose.

### Features
- `/add 12.50 groceries apples` - stores an expense with optional note
- `/list` - shows the latest expenses
- `/total` - displays the total you have logged

### Quick start with Docker
1) Copy the example env file and add your bot token:
   ```bash
   cp .env.example .env
   # edit .env and set BOT_TOKEN
   ```
2) Launch the stack:
   ```bash
   docker compose up --build
   ```
   - Services: `bot` (aiogram) + `db` (PostgreSQL 15).
   - PostgreSQL is exposed on `localhost:${POSTGRES_PORT:-5432}` for local tools.

### Running locally without Docker
1) Create and activate a venv, then install deps:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2) Start PostgreSQL (local or remote) and set env vars:
   ```bash
   cp .env.example .env
   export BOT_TOKEN=your-token
   export POSTGRES_HOST=localhost
   python -m app.main
   ```

### Project layout
- `app/main.py` - bot entrypoint
- `app/handlers.py` - commands and messaging logic
- `app/repository.py` - expense persistence via asyncpg
- `app/config.py` - settings from environment/.env
- `docker-compose.yml` - bot + PostgreSQL stack
