import json
import os

from openai import OpenAI

from app.models import AnalysisRequest, AnalysisResponse


def is_openai_enabled() -> bool:
    return os.getenv("ENABLE_OPENAI_ANALYSIS", "").lower() == "true"


def has_openai_key() -> bool:
    return bool(os.getenv("OPENAI_API_KEY"))


def get_openai_model() -> str:
    return os.getenv("OPENAI_MODEL", "gpt-5.4-mini")


def disallow_extra_properties(schema: dict[str, object]) -> dict[str, object]:
    if schema.get("type") == "object":
        schema["additionalProperties"] = False

    for value in schema.values():
        if isinstance(value, dict):
            disallow_extra_properties(value)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, dict):
                    disallow_extra_properties(item)

    return schema


def analysis_response_schema() -> dict[str, object]:
    return disallow_extra_properties(AnalysisResponse.model_json_schema())


def build_ai_prompt(request: AnalysisRequest) -> str:
    resume_text = (request.resume_text or "").strip()

    return (
        "Create an ATS-style resume analysis for ApplyIQ.\n"
        "Return only structured data that matches the provided schema.\n"
        "Keep the tone specific, practical, and recruiter-friendly.\n"
        "Do not claim this is a real ATS score. Do not invent credentials.\n\n"
        f"Role: {request.role}\n"
        f"Company: {request.company}\n"
        f"Resume file: {request.resume_name}\n\n"
        f"Job description:\n{request.job_description[:6000]}\n\n"
        f"Extracted resume text:\n{resume_text[:12000]}"
    )


def normalize_ai_analysis(data: dict[str, object], request: AnalysisRequest) -> AnalysisResponse:
    data["id"] = "ai-analysis"
    data["role"] = request.role
    data["company"] = request.company
    data["resumeFile"] = request.resume_name
    data["analyzedAt"] = "Just now"
    return AnalysisResponse.model_validate(data)


def create_ai_analysis(request: AnalysisRequest) -> dict[str, object]:
    client = OpenAI()
    response = client.responses.create(
        model=get_openai_model(),
        input=[
            {
                "role": "system",
                "content": (
                    "You are ApplyIQ, a resume optimization assistant. "
                    "Analyze only the provided resume text and job description. "
                    "Return concise, useful, structured JSON."
                ),
            },
            {"role": "user", "content": build_ai_prompt(request)},
        ],
        text={
            "format": {
                "type": "json_schema",
                "name": "applyiq_analysis",
                "schema": analysis_response_schema(),
                "strict": True,
            }
        },
    )
    analysis = normalize_ai_analysis(json.loads(response.output_text), request)
    return analysis.model_dump()
