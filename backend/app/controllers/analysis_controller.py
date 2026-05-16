from fastapi import APIRouter, HTTPException

from app.models.analysis_models import AnalysisRequest
from app.services.analysis_service import (
    create_ai_analysis,
    create_mock_analysis,
    has_openai_key,
    is_openai_enabled,
)


router = APIRouter()


@router.post("/analysis/mock")
def mock_analysis(request: AnalysisRequest) -> dict[str, object]:
    return create_mock_analysis(request)


@router.post("/analysis/ai")
def ai_analysis(request: AnalysisRequest) -> dict[str, object]:
    if not is_openai_enabled():
        raise HTTPException(
            status_code=503,
            detail="OpenAI analysis is disabled. Use /analysis/mock as fallback.",
        )

    if not has_openai_key():
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not configured. Use /analysis/mock as fallback.",
        )

    try:
        return create_ai_analysis(request)
    except Exception as error:
        raise HTTPException(
            status_code=502,
            detail=f"OpenAI analysis failed. Use /analysis/mock as fallback. {error}",
        ) from error
