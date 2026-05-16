from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def analysis_payload() -> dict[str, str]:
    return {
        "role": "Senior Frontend Engineer",
        "company": "Acme Corp",
        "resume_name": "resume.txt",
        "resume_text": "React TypeScript Next.js",
        "job_description": "Need React TypeScript GraphQL AWS",
    }


def test_health_route_returns_ok() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_mock_analysis_route_returns_analysis_shape() -> None:
    response = client.post("/analysis/mock", json=analysis_payload())
    body = response.json()

    assert response.status_code == 200
    assert body["id"] == "api-mock-analysis"
    assert body["role"] == "Senior Frontend Engineer"
    assert body["company"] == "Acme Corp"
    assert isinstance(body["score"], int)
    assert body["matchedKeywords"]
    assert body["missingKeywords"]
    assert body["suggestions"]
    assert body["rewrites"]
    assert body["coverLetter"]


def test_ai_analysis_route_returns_fallback_when_disabled(monkeypatch) -> None:
    monkeypatch.delenv("ENABLE_OPENAI_ANALYSIS", raising=False)
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)

    response = client.post("/analysis/ai", json=analysis_payload())

    assert response.status_code == 503
    assert response.json() == {
        "detail": "OpenAI analysis is disabled. Use /analysis/mock as fallback."
    }


def test_ai_analysis_route_returns_fallback_when_key_missing(monkeypatch) -> None:
    monkeypatch.setenv("ENABLE_OPENAI_ANALYSIS", "true")
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)

    response = client.post("/analysis/ai", json=analysis_payload())

    assert response.status_code == 503
    assert response.json() == {
        "detail": "OPENAI_API_KEY is not configured. Use /analysis/mock as fallback."
    }
