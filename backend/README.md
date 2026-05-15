# ApplyIQ Backend

Minimal FastAPI mock API for the ApplyIQ full-stack demo.

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn
uvicorn app.main:app --reload
```

## Routes

- `GET /health` returns API health.
- `POST /analysis/mock` returns mock resume analysis JSON shaped for the frontend.

Example request:

```json
{
  "role": "Senior Frontend Engineer",
  "company": "Acme Corp",
  "resume_name": "Arel_Gabay_Resume.pdf",
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
