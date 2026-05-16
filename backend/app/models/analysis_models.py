from pydantic import BaseModel


class AnalysisRequest(BaseModel):
    job_description: str
    role: str = "Senior Frontend Engineer"
    company: str = "Acme Corp"
    resume_name: str = "Resume.pdf"
    resume_text: str | None = None


class Keyword(BaseModel):
    label: str
    category: str


class Rewrite(BaseModel):
    before: str
    after: str


class AnalysisResponse(BaseModel):
    id: str
    role: str
    company: str
    resumeFile: str
    analyzedAt: str
    score: int
    summary: str
    missingKeywords: list[Keyword]
    matchedKeywords: list[Keyword]
    suggestions: list[str]
    rewrites: list[Rewrite]
    coverLetter: str
