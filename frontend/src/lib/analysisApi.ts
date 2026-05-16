import { API_ANALYSIS_STORAGE_KEY, type AnalysisResult } from "@/lib/mockAnalysis";

type AnalysisEndpoint = "ai" | "mock";

export type AnalysisPayload = {
  role: string;
  company: string;
  resume_name: string;
  resume_text: string;
  job_description: string;
};

export type DashboardAnalysisRequest = {
  apiUrl?: string;
  selectedAnalysisId: string;
  role: string;
  company: string;
  resumeName: string;
  resumeText: string;
  jobDescription: string;
};

export type DashboardAnalysisResult = {
  route: string;
  apiError?: string;
};

async function requestAnalysis(
  apiUrl: string,
  endpoint: AnalysisEndpoint,
  payload: AnalysisPayload,
): Promise<AnalysisResult> {
  const response = await fetch(`${apiUrl}/analysis/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`${endpoint.toUpperCase()} analysis failed`);
  }

  return response.json();
}

function buildLocalAnalysisRoute(input: DashboardAnalysisRequest) {
  const params = new URLSearchParams({
    id: input.selectedAnalysisId,
    role: input.role,
    company: input.company,
    resume: input.resumeName,
  });

  return `/analysis?${params.toString()}`;
}

export async function submitDashboardAnalysis(
  input: DashboardAnalysisRequest,
): Promise<DashboardAnalysisResult> {
  if (!input.apiUrl) {
    return { route: buildLocalAnalysisRoute(input) };
  }

  const payload = {
    role: input.role,
    company: input.company,
    resume_name: input.resumeName,
    resume_text: input.resumeText,
    job_description: input.jobDescription,
  };

  try {
    const analysis = await requestAnalysis(input.apiUrl, "ai", payload);
    sessionStorage.setItem(API_ANALYSIS_STORAGE_KEY, JSON.stringify(analysis));
    return { route: "/analysis?source=ai" };
  } catch {
    try {
      const analysis = await requestAnalysis(input.apiUrl, "mock", payload);
      sessionStorage.setItem(API_ANALYSIS_STORAGE_KEY, JSON.stringify(analysis));
      return {
        route: "/analysis?source=api",
        apiError:
          "OpenAI analysis is unavailable, so ApplyIQ used the deterministic API mock fallback.",
      };
    } catch {
      return {
        route: buildLocalAnalysisRoute(input),
        apiError:
          "The API is not reachable, so ApplyIQ used the built-in mock fallback.",
      };
    }
  }
}
