# ApplyIQ Backend

FastAPI API for the ApplyIQ full-stack demo. The deterministic mock route is the
default safe path; optional OpenAI analysis can be enabled locally with
environment variables.

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Test

```bash
source .venv/bin/activate
pip install -r requirements-dev.txt
python -m pytest
```

Optional OpenAI analysis:

```bash
export OPENAI_API_KEY=sk-...
export ENABLE_OPENAI_ANALYSIS=true
export OPENAI_MODEL=gpt-5.4-mini
uvicorn app.main:app --reload
```

If OpenAI is disabled, missing a key, or fails, the frontend falls back to the
deterministic mock route.

## Deploy

This backend can deploy as a standalone Vercel Python/FastAPI project from the
`backend/` directory.

Recommended Vercel settings:

- Project name: `applyiq-api`
- Root directory: `backend`
- Python version: `3.13`
- Entry point: `app.main:app`
- Environment variables: none required for the mock API
- Optional AI environment variables: `OPENAI_API_KEY`, `ENABLE_OPENAI_ANALYSIS`, `OPENAI_MODEL`

Production API:

- <https://applyiq-api-arel.vercel.app>

## Routes

- `GET /health` returns API health.
- `POST /analysis/mock` returns deterministic resume analysis JSON shaped for the frontend.
- `POST /analysis/ai` returns OpenAI-powered analysis when enabled, otherwise a clear fallback-ready error.

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

The deployed frontend points at the public API, but production OpenAI remains
disabled unless backend environment variables are explicitly configured.
PostgreSQL persistence and authentication are intentionally future work.
