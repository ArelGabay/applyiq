# ApplyIQ

AI-powered ATS resume optimization platform — a portfolio-quality project for job seekers.

## Project structure

```
applyiq/
├── frontend/     # Next.js + TypeScript + Tailwind CSS
├── backend/      # FastAPI (coming soon)
├── AGENTS.md     # AI agent guidelines
└── README.md
```

## Features (planned)

- ATS match score
- Missing keyword detection
- Resume suggestions
- AI rewrites
- Tailored cover letters

## Frontend

### Prerequisites

- Node.js 20.9+ (Next.js 16). Use [nvm](https://github.com/nvm-sh/nvm): `nvm install` in `frontend/` (reads `.nvmrc`).

### Run locally

```bash
cd frontend
nvm use          # or: nvm install
npm install
npm run dev
```

If you see a Node version error despite `nvm use`, an older Node at `/usr/local/bin/node` may be taking precedence. The npm scripts use npm’s own Node to avoid that; always run `nvm use` in the same terminal before `npm run dev`.

Open [http://localhost:3000](http://localhost:3000).

### Pages

| Route        | Description              |
| ------------ | ------------------------ |
| `/`          | Landing page             |
| `/dashboard` | Upload & recent analyses |
| `/analysis`  | Sample analysis results  |

## Backend

The `backend/` directory is reserved for a future FastAPI service.

## Development

See [AGENTS.md](./AGENTS.md) for MVP priorities and scope guidelines.
