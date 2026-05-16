from app.models.analysis_models import AnalysisRequest
from app.services.analysis_service import create_mock_analysis


def make_request(resume_text: str) -> AnalysisRequest:
    return AnalysisRequest(
        role="Senior Frontend Engineer",
        company="Acme Corp",
        resume_name="resume.txt",
        resume_text=resume_text,
        job_description="Need React TypeScript GraphQL AWS",
    )


def labels(keywords: list[dict[str, str]]) -> set[str]:
    return {keyword["label"] for keyword in keywords}


def test_mock_analysis_matches_resume_and_job_overlap() -> None:
    result = create_mock_analysis(make_request("React TypeScript Next.js"))

    assert labels(result["matchedKeywords"]) == {"React", "TypeScript"}


def test_mock_analysis_marks_job_terms_missing_when_absent_from_resume() -> None:
    result = create_mock_analysis(make_request("React TypeScript Next.js"))

    assert labels(result["missingKeywords"]) == {"AWS", "GraphQL"}


def test_mock_analysis_score_changes_with_keyword_coverage() -> None:
    low_result = create_mock_analysis(make_request(""))
    partial_result = create_mock_analysis(make_request("React TypeScript"))
    high_result = create_mock_analysis(make_request("React TypeScript GraphQL AWS"))

    assert low_result["score"] == 62
    assert partial_result["score"] == 79
    assert high_result["score"] == 96
