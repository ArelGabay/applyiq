import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveAnalysis } from "./analysisSession";
import { defaultAnalysis } from "./mockAnalysis";
import { saveAnalysis } from "./savedAnalyses";

function createLocalStorage() {
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

describe("analysisSession", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      localStorage: createLocalStorage(),
      sessionStorage: createLocalStorage(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("resolves a saved analysis from localStorage", () => {
    saveAnalysis({
      id: "saved-analysis",
      analysis: { ...defaultAnalysis, role: "Saved Role" },
      sourceLabel: "API mock result",
      savedAt: "2026-05-16T12:00:00.000Z",
    });

    const result = resolveAnalysis(null, undefined, "saved-analysis");

    expect(result.analysis.role).toBe("Saved Role");
    expect(result.sourceLabel).toBe("API mock result");
    expect(result.isApiResult).toBe(true);
  });

  it("falls back to sample data when a saved id is missing", () => {
    const result = resolveAnalysis(null, "frontend-engineer", "missing");

    expect(result.analysis.id).toBe("frontend-engineer");
    expect(result.sourceLabel).toBe("Local mock result");
  });
});
