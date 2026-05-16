# ApplyIQ Frontend

Next.js frontend for the ApplyIQ portfolio demo. The app provides the landing
page, resume analysis dashboard, browser resume parsing, saved analysis history,
and analysis results UI.

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Vitest

## Run Locally

Use Node 20.x. The project is usually run with `nvm`:

```bash
nvm use
npm install
npm run dev
```

Open <http://localhost:3000>.

## Environment

Create `.env.local` from `.env.example` when connecting to a local backend:

```bash
cp .env.example .env.local
```

Set:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If `NEXT_PUBLIC_API_URL` is missing, the dashboard still works with local mock
analysis data. In production, the deployed frontend points at the public FastAPI
backend.

## Product Behavior

- TXT, PDF, and DOCX resume text is extracted in the browser.
- Dashboard submissions try `/analysis/ai` first when an API URL exists.
- If AI is disabled or unavailable, the frontend falls back to `/analysis/mock`.
- If the API is unavailable, the app falls back to built-in local mock results.
- The latest API result is stored in `sessionStorage`.
- Completed analyses are saved in browser `localStorage` under
  `applyiq.savedAnalyses`, capped to the 10 most recent records.
- Saved history is private to the current browser/device and is not stored by the
  backend.

## Useful Commands

```bash
npm run lint
npm run test
npm run build
```

## Routes

| Route        | Purpose                                |
| ------------ | -------------------------------------- |
| `/`          | Landing page                           |
| `/dashboard` | Resume upload and job description flow |
| `/analysis`  | Current, saved, or sample result view  |

Saved analyses open through `/analysis?saved=<id>`.
