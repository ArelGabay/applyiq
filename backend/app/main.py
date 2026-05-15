from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI(title="ApplyIQ API", version="0.1.0")


class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str
    role: str = "Senior Frontend Engineer"
    company: str = "Acme Corp"


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/analysis/mock")
def mock_analysis(request: AnalysisRequest) -> dict[str, object]:
    return {
        "role": request.role,
        "company": request.company,
        "score": 82,
        "missing_keywords": ["GraphQL", "CI/CD", "Accessibility", "AWS"],
        "matched_keywords": ["React", "TypeScript", "Next.js", "Performance"],
        "suggestions": [
            "Add measurable impact to recent frontend bullets.",
            "Mirror the job description's design system and accessibility language.",
            "Include deployment or CI/CD ownership if applicable.",
        ],
        "note": "Mock response only. OpenAI and persistence are intentionally out of scope for the MVP.",
    }
