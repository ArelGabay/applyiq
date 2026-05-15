# ApplyIQ Backend

Minimal FastAPI placeholder for the future ApplyIQ API.

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn
uvicorn app.main:app --reload
```

## Routes

- `GET /health` returns API health.
- `POST /analysis/mock` returns mock resume analysis JSON.

The frontend MVP does not depend on this service yet. Real resume parsing,
PostgreSQL persistence, and OpenAI calls are intentionally future work.
