# ApplyIQ Backend

Minimal FastAPI mock API for the ApplyIQ full-stack demo.

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn
uvicorn app.main:app --reload
```

## Deploy

This backend can deploy as a standalone Vercel Python/FastAPI project from the
`backend/` directory.

Recommended Vercel settings:

- Project name: `applyiq-api`
- Root directory: `backend`
- Python version: `3.13`
- Entry point: `app.main:app`
- Environment variables: none required for the mock API

Production API:

- <https://applyiq-api-arel.vercel.app>

## Routes

- `GET /health` returns API health.
- `POST /analysis/mock` returns mock resume analysis JSON shaped for the frontend.

Example request:

```json
{
  "role": "Senior Frontend Engineer",
  "company": "Acme Corp",
  "resume_name": "Arel_Gabay_Resume.pdf",
  "resume_text": "Extracted resume text...",
  "job_description": "Job description text..."
}
```

The frontend can call this API locally with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

The deployed frontend does not depend on this service yet. Real resume parsing,
PostgreSQL persistence, OpenAI calls, and backend deployment are intentionally
future work.
