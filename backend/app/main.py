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


KEYWORD_BANK = [
    {"label": "React", "category": "skill", "terms": ["react"]},
    {"label": "TypeScript", "category": "skill", "terms": ["typescript", "type script"]},
    {"label": "Python", "category": "skill", "terms": ["python"]},
    {"label": "JavaScript", "category": "skill", "terms": ["javascript", "java script"]},
    {"label": "HTML", "category": "skill", "terms": ["html"]},
    {"label": "CSS", "category": "skill", "terms": ["css"]},
    {"label": "Next.js", "category": "tool", "terms": ["next.js", "nextjs", "next js"]},
    {"label": "FastAPI", "category": "tool", "terms": ["fastapi", "fast api"]},
    {"label": "PostgreSQL", "category": "tool", "terms": ["postgresql", "postgres"]},
    {"label": "Docker", "category": "tool", "terms": ["docker"]},
    {"label": "AWS", "category": "tool", "terms": ["aws", "amazon web services"]},
    {"label": "GraphQL", "category": "tool", "terms": ["graphql", "graph ql"]},
    {"label": "CI/CD", "category": "tool", "terms": ["ci/cd", "cicd", "ci cd"]},
    {"label": "Git", "category": "tool", "terms": ["git", "github"]},
    {"label": "Accessibility", "category": "impact", "terms": ["accessibility", "a11y"]},
    {"label": "Performance", "category": "impact", "terms": ["performance", "latency"]},
    {"label": "Design systems", "category": "domain", "terms": ["design system", "design systems"]},
    {"label": "REST APIs", "category": "domain", "terms": ["rest api", "rest apis", "restful"]},
    {"label": "Testing", "category": "impact", "terms": ["testing", "tests", "jest", "pytest"]},
    {
        "label": "Component architecture",
        "category": "domain",
        "terms": ["component architecture", "components", "component library"],
    },
]


def contains_any_term(text: str, terms: list[str]) -> bool:
    return any(term in text for term in terms)


def format_labels(keywords: list[dict[str, str]], fallback: str) -> str:
    labels = [keyword["label"] for keyword in keywords[:3]]

    if not labels:
        return fallback

    if len(labels) == 1:
        return labels[0]

    return f"{', '.join(labels[:-1])}, and {labels[-1]}"


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/analysis/mock")
def mock_analysis(request: AnalysisRequest) -> dict[str, object]:
    normalized_description = request.job_description.lower()
    normalized_resume = (request.resume_text or "").lower()
    has_resume_text = bool(normalized_resume.strip())
    relevant_keywords = [
        keyword
        for keyword in KEYWORD_BANK
        if contains_any_term(normalized_description, keyword["terms"])
    ]

    if not relevant_keywords:
        relevant_keywords = KEYWORD_BANK[:8]

    matched_keywords = [
        {"label": keyword["label"], "category": keyword["category"]}
        for keyword in relevant_keywords
        if has_resume_text and contains_any_term(normalized_resume, keyword["terms"])
    ]
    missing_keywords = [
        {"label": keyword["label"], "category": keyword["category"]}
        for keyword in relevant_keywords
        if not has_resume_text or not contains_any_term(normalized_resume, keyword["terms"])
    ]

    coverage = len(matched_keywords) / len(relevant_keywords)
    score = min(96, max(58, round(62 + coverage * 34)))
    matched_label_text = format_labels(matched_keywords, "core role requirements")
    missing_label_text = format_labels(missing_keywords, "a few job-specific keywords")

    return {
        "id": "api-mock-analysis",
        "role": request.role,
        "company": request.company,
        "resumeFile": request.resume_name,
        "analyzedAt": "Just now",
        "score": score,
        "summary": (
            f"ApplyIQ found {len(matched_keywords)} of {len(relevant_keywords)} target "
            f"signals for the {request.role} role at {request.company}. "
            f"The resume already reflects {matched_label_text}. "
            f"Tightening {missing_label_text} would make the application feel more tailored."
        ),
        "missingKeywords": missing_keywords,
        "matchedKeywords": matched_keywords,
        "suggestions": [
            f"Add {missing_label_text} where it honestly matches your project experience.",
            f"Keep {matched_label_text} visible in the summary, skills, and strongest project bullets.",
            "Add one measurable impact point to the most relevant recent experience.",
            "Use the target role title naturally near the top of the resume.",
        ],
        "rewrites": [
            {
                "before": "Worked on application features and improved the product.",
                "after": (
                    f"Delivered product features aligned with {request.role} requirements, "
                    f"highlighting {matched_label_text} while improving usability, "
                    "maintainability, and release confidence."
                ),
            },
            {
                "before": "Built technical projects using modern tools.",
                "after": (
                    f"Built portfolio-ready software that connects {matched_label_text} "
                    f"to practical outcomes, with room to emphasize {missing_label_text} "
                    "for this specific job description."
                ),
            },
        ],
        "coverLetter": (
            f"Dear {request.company} hiring team,\n\n"
            f"I am excited to apply for the {request.role} role. My experience "
            f"shows alignment with {matched_label_text}, which stood out as important "
            "in your job description. I enjoy turning ambiguous requirements into "
            "clean user flows, measurable improvements, and maintainable systems.\n\n"
            f"Before applying, I would further tailor the resume around {missing_label_text} "
            "so the strongest experience is easier for recruiters and ATS systems to find. "
            "I would bring that same "
            f"focused, product-minded approach to {request.company}.\n\n"
            "Thank you for your consideration.\nArel Gabay"
        ),
    }
