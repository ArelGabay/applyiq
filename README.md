# ApplyIQ

AI-powered ATS resume optimization demo built with Next.js, TypeScript,
Tailwind CSS, and a FastAPI placeholder backend.

> Live demo: <https://applyiq-arel.vercel.app>

ApplyIQ is a portfolio-ready job application assistant. The MVP uses polished
mock data to demonstrate how a user could upload a resume, compare it with a job
description, and receive ATS-focused guidance.

## MVP status

- Landing page with product positioning and sample analysis preview
- Dashboard mock workflow for resume upload, role/company details, and job description input
- Analysis results with ATS score, missing keywords, matched keywords, resume suggestions, AI rewrite examples, and cover letter preview
- Copyable mock cover letter output
- Minimal FastAPI placeholder for future API work

## Screenshots

Screenshots to add next:

- Landing page
- Dashboard workflow
- Analysis results

## Tech stack

| Area      | Tech                                      |
| --------- | ----------------------------------------- |
| Frontend  | Next.js, TypeScript, Tailwind CSS         |
| Backend   | FastAPI, Python placeholder               |
| Data      | Local mock analysis data                  |
| AI        | Mock AI output first, OpenAI planned later |
| Database  | PostgreSQL planned later                  |

## Project structure

```text
applyiq/
├── frontend/     # Next.js + TypeScript + Tailwind CSS
├── backend/      # FastAPI placeholder
├── AGENTS.md     # AI agent guidelines
└── README.md
```

## Frontend

### Prerequisites

- Node.js 20.9+ for Next.js 16
- Recommended: run `nvm use` inside `frontend/`

### Run locally

```bash
cd frontend
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If a Next.js command reports an old Node version, confirm `node -v` prints
`v20.9.0` or newer after `nvm use`.

### Pages

| Route        | Description                                  |
| ------------ | -------------------------------------------- |
| `/`          | Landing page                                 |
| `/dashboard` | Mock resume analysis workflow                |
| `/analysis`  | Rich mock analysis results and cover letter  |

## Backend

The backend is intentionally light for this phase. It gives the repo a clear
FastAPI direction without becoming a dependency for the frontend demo.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Routes:

- `GET /health`
- `POST /analysis/mock`

## Deployment

The current production target is the Next.js app in `frontend/`.

Recommended Vercel settings:

- Framework: Next.js
- Root directory: `frontend`
- Install command: `npm install`
- Build command: `npm run build`
- Node version: 20.x
- Environment variables: none required for the mock MVP

Production deployment:

- <https://applyiq-arel.vercel.app>

## Future roadmap

1. Replace mock analysis data with a real FastAPI endpoint.
2. Add resume text extraction for PDF/DOCX uploads.
3. Integrate OpenAI for scoring, keyword extraction, rewrites, and cover letters.
4. Add PostgreSQL persistence for saved analyses.
5. Add authentication only after the core workflow is useful.

## Notes

This MVP deliberately avoids authentication, payments, real ATS integrations,
LinkedIn scraping, and production AI calls. The goal is a fast, clean product
demo that is easy to extend.
