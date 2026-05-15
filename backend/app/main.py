from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="ApplyIQ API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://applyiq-arel.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalysisRequest(BaseModel):
    job_description: str
    role: str = "Senior Frontend Engineer"
    company: str = "Acme Corp"
    resume_name: str = "Resume.pdf"
    resume_text: str | None = None


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/analysis/mock")
def mock_analysis(request: AnalysisRequest) -> dict[str, object]:
    normalized_description = request.job_description.lower()
    has_resume_text = bool(request.resume_text and request.resume_text.strip())
    is_full_stack = "python" in normalized_description or "backend" in normalized_description
    score = 76 if is_full_stack else 82
    missing_keywords = (
        [
            {"label": "PostgreSQL", "category": "tool"},
            {"label": "Docker", "category": "tool"},
            {"label": "REST APIs", "category": "domain"},
            {"label": "Cloud deployment", "category": "impact"},
        ]
        if is_full_stack
        else [
            {"label": "GraphQL", "category": "tool"},
            {"label": "CI/CD", "category": "tool"},
            {"label": "Accessibility", "category": "impact"},
            {"label": "Design systems", "category": "domain"},
            {"label": "AWS", "category": "tool"},
        ]
    )
    matched_keywords = (
        [
            {"label": "React", "category": "skill"},
            {"label": "TypeScript", "category": "skill"},
            {"label": "Python", "category": "skill"},
            {"label": "Testing", "category": "impact"},
        ]
        if is_full_stack
        else [
            {"label": "React", "category": "skill"},
            {"label": "TypeScript", "category": "skill"},
            {"label": "Next.js", "category": "tool"},
            {"label": "Performance", "category": "impact"},
            {"label": "Component architecture", "category": "domain"},
        ]
    )

    return {
        "id": "api-mock-analysis",
        "role": request.role,
        "company": request.company,
        "resumeFile": request.resume_name,
        "analyzedAt": "Just now",
        "score": score,
        "summary": (
            f"{request.role} at {request.company} is a strong mock match. "
            "The API response highlights role-specific keyword gaps and gives "
            "a recruiter-friendly direction for tightening the resume. "
            + (
                "Extracted resume text was received for this mock analysis."
                if has_resume_text
                else "No extracted resume text was provided, so sample signals were used."
            )
        ),
        "missingKeywords": missing_keywords,
        "matchedKeywords": matched_keywords,
        "suggestions": [
            "Mirror the exact role language from the job description in the resume summary.",
            "Add measurable impact to the most relevant recent project bullet.",
            "Bring missing keywords into experience bullets only where they match real work.",
            "Make the skills section easier for ATS systems to scan.",
        ],
        "rewrites": [
            {
                "before": "Worked on application features for users.",
                "after": (
                    "Delivered user-facing product features aligned with "
                    f"{request.role} requirements, improving clarity, maintainability, "
                    "and release confidence."
                ),
            },
            {
                "before": "Helped improve the resume project.",
                "after": (
                    "Built a full-stack mock analysis workflow with a Next.js frontend "
                    "and FastAPI endpoint, creating a more credible product demo."
                ),
            },
        ],
        "coverLetter": (
            f"Dear {request.company} hiring team,\n\n"
            f"I am excited to apply for the {request.role} role. My experience "
            "building polished, practical software products aligns with the needs "
            "outlined in your job description. I enjoy turning ambiguous requirements "
            "into clean user flows, measurable improvements, and maintainable systems.\n\n"
            "This mock ApplyIQ analysis highlights the strongest resume signals while "
            "surfacing keyword gaps to address before applying. I would bring that same "
            f"focused, product-minded approach to {request.company}.\n\n"
            "Thank you for your consideration.\nArel Gabay"
        ),
    }
