import {
  API_ANALYSIS_STORAGE_KEY,
  defaultAnalysis,
  findAnalysis,
  type AnalysisResult,
} from "@/lib/mockAnalysis";
import { findSavedAnalysis } from "@/lib/savedAnalyses";

export function readStoredAnalysis(source: string | null) {
  if ((source !== "api" && source !== "ai") || typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.sessionStorage.getItem(API_ANALYSIS_STORAGE_KEY);
    return storedValue ? (JSON.parse(storedValue) as AnalysisResult) : null;
  } catch {
    return null;
  }
}

export function resolveAnalysis(
  source: string | null,
  id?: string | string[],
  savedId?: string | null,
) {
  const savedAnalysis = findSavedAnalysis(savedId);

  if (savedAnalysis) {
    return {
      analysis: savedAnalysis.analysis,
      isAiResult: savedAnalysis.sourceLabel === "AI result",
      isApiResult: savedAnalysis.sourceLabel === "API mock result",
      sourceLabel: savedAnalysis.sourceLabel,
    };
  }

  const storedAnalysis = readStoredAnalysis(source);
  const analysis =
    source === "api" || source === "ai"
      ? storedAnalysis ?? defaultAnalysis
      : findAnalysis(id);

  return {
    analysis,
    isAiResult: source === "ai" && Boolean(storedAnalysis),
    isApiResult: source === "api" && Boolean(storedAnalysis),
    sourceLabel:
      source === "ai" && Boolean(storedAnalysis)
        ? "AI result"
        : source === "api" && Boolean(storedAnalysis)
          ? "API mock result"
          : "Local mock result",
  };
}
