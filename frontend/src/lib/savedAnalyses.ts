import type { AnalysisResult } from "@/lib/mockAnalysis";

export const SAVED_ANALYSES_STORAGE_KEY = "applyiq.savedAnalyses";
export const SAVED_ANALYSES_LIMIT = 10;

export type AnalysisSourceLabel =
  | "AI result"
  | "API mock result"
  | "Local mock result";

export type SavedAnalysisRecord = {
  id: string;
  role: string;
  company: string;
  resumeFile: string;
  score: number;
  sourceLabel: AnalysisSourceLabel;
  savedAt: string;
  analysis: AnalysisResult;
};

type SaveAnalysisInput = {
  analysis: AnalysisResult;
  sourceLabel: AnalysisSourceLabel;
  role?: string;
  company?: string;
  resumeFile?: string;
  id?: string;
  savedAt?: string;
};

function getStorage() {
  return typeof window === "undefined" ? null : window.localStorage;
}

function safeJsonParse(value: string | null): SavedAnalysisRecord[] {
  if (!value) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(value);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function createSavedAnalysisId(savedAt: string, analysis: AnalysisResult) {
  const normalizedRole = analysis.role.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const uniquePart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10);

  return `saved-${Date.parse(savedAt)}-${normalizedRole || "analysis"}-${uniquePart}`;
}

export function readSavedAnalyses(): SavedAnalysisRecord[] {
  const storage = getStorage();

  if (!storage) {
    return [];
  }

  return safeJsonParse(storage.getItem(SAVED_ANALYSES_STORAGE_KEY));
}

export function findSavedAnalysis(id?: string | null) {
  if (!id) {
    return null;
  }

  return readSavedAnalyses().find((record) => record.id === id) ?? null;
}

export function saveAnalysis(input: SaveAnalysisInput): SavedAnalysisRecord {
  const savedAt = input.savedAt ?? new Date().toISOString();
  const role = input.role ?? input.analysis.role;
  const company = input.company ?? input.analysis.company;
  const resumeFile = input.resumeFile ?? input.analysis.resumeFile;
  const analysis = {
    ...input.analysis,
    role,
    company,
    resumeFile,
  };
  const record = {
    id: input.id ?? createSavedAnalysisId(savedAt, analysis),
    role,
    company,
    resumeFile,
    score: analysis.score,
    sourceLabel: input.sourceLabel,
    savedAt,
    analysis,
  };
  const storage = getStorage();

  if (!storage) {
    return record;
  }

  const existingRecords = readSavedAnalyses().filter(
    (savedRecord) => savedRecord.id !== record.id,
  );
  const nextRecords = [record, ...existingRecords].slice(0, SAVED_ANALYSES_LIMIT);
  storage.setItem(SAVED_ANALYSES_STORAGE_KEY, JSON.stringify(nextRecords));
  return record;
}

export function clearSavedAnalyses() {
  getStorage()?.removeItem(SAVED_ANALYSES_STORAGE_KEY);
}
