import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitDashboardAnalysis, type DashboardAnalysisRequest } from "./analysisApi";
import { API_ANALYSIS_STORAGE_KEY, type AnalysisResult } from "./mockAnalysis";

function analysis(overrides: Partial<AnalysisResult> = {}): AnalysisResult {
  return {
    id: "api-mock-analysis",
    role: "Senior Frontend Engineer",
    company: "Acme Corp",
    resumeFile: "resume.txt",
    analyzedAt: "Just now",
    score: 82,
    summary: "Summary",
    missingKeywords: [],
    matchedKeywords: [],
    suggestions: [],
    rewrites: [],
    coverLetter: "Cover letter",
    ...overrides,
  };
}

function request(overrides: Partial<DashboardAnalysisRequest> = {}): DashboardAnalysisRequest {
  return {
    apiUrl: "https://api.example.com",
    selectedAnalysisId: "frontend-engineer",
    role: "Senior Frontend Engineer",
    company: "Acme Corp",
    resumeName: "resume.txt",
    resumeText: "React TypeScript",
    jobDescription: "Need React TypeScript GraphQL",
    ...overrides,
  };
}

function response(ok: boolean, body: AnalysisResult = analysis()) {
  return {
    ok,
    json: vi.fn().mockResolvedValue(body),
  };
}

function createSessionStorage() {
  const values = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key);
    }),
    clear: vi.fn(() => {
      values.clear();
    }),
  };
}

describe("submitDashboardAnalysis", () => {
  beforeEach(() => {
    vi.stubGlobal("sessionStorage", createSessionStorage());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("routes to local sample analysis when no API URL is configured", async () => {
    const result = await submitDashboardAnalysis(request({ apiUrl: undefined }));

    expect(result).toEqual({
      route:
        "/analysis?id=frontend-engineer&role=Senior+Frontend+Engineer&company=Acme+Corp&resume=resume.txt",
    });
  });

  it("routes to AI results when the AI endpoint succeeds", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response(true, analysis({ id: "ai-analysis" })));
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitDashboardAnalysis(request());

    expect(result).toEqual({ route: "/analysis?source=ai" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/analysis/ai",
      expect.objectContaining({ method: "POST" }),
    );
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      API_ANALYSIS_STORAGE_KEY,
      JSON.stringify(analysis({ id: "ai-analysis" })),
    );
  });

  it("falls back to API mock results when AI fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(response(false))
      .mockResolvedValueOnce(response(true, analysis()));
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitDashboardAnalysis(request());

    expect(result).toEqual({
      route: "/analysis?source=api",
      apiError:
        "OpenAI analysis is unavailable, so ApplyIQ used the deterministic API mock fallback.",
    });
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.example.com/analysis/mock",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("falls back to local sample analysis when both API endpoints fail", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response(false));
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitDashboardAnalysis(request());

    expect(result).toEqual({
      route:
        "/analysis?id=frontend-engineer&role=Senior+Frontend+Engineer&company=Acme+Corp&resume=resume.txt",
      apiError:
        "The API is not reachable, so ApplyIQ used the built-in mock fallback.",
    });
  });
});
