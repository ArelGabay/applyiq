import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearSavedAnalyses,
  findSavedAnalysis,
  readSavedAnalyses,
  saveAnalysis,
  SAVED_ANALYSES_LIMIT,
  SAVED_ANALYSES_STORAGE_KEY,
} from "./savedAnalyses";
import { defaultAnalysis, type AnalysisResult } from "./mockAnalysis";

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

function analysis(overrides: Partial<AnalysisResult> = {}): AnalysisResult {
  return {
    ...defaultAnalysis,
    ...overrides,
  };
}

describe("savedAnalyses", () => {
  beforeEach(() => {
    vi.stubGlobal("window", { localStorage: createLocalStorage() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("saves and reads analysis records", () => {
    const saved = saveAnalysis({
      id: "saved-1",
      savedAt: "2026-05-16T12:00:00.000Z",
      analysis: analysis({ role: "Frontend Engineer", score: 88 }),
      sourceLabel: "API mock result",
    });

    expect(saved).toMatchObject({
      id: "saved-1",
      role: "Frontend Engineer",
      score: 88,
      sourceLabel: "API mock result",
      savedAt: "2026-05-16T12:00:00.000Z",
    });
    expect(readSavedAnalyses()).toEqual([saved]);
  });

  it("resolves a saved analysis by id", () => {
    saveAnalysis({
      id: "saved-2",
      analysis: analysis({ company: "Acme Corp" }),
      sourceLabel: "AI result",
      savedAt: "2026-05-16T12:00:00.000Z",
    });

    expect(findSavedAnalysis("saved-2")?.company).toBe("Acme Corp");
    expect(findSavedAnalysis("missing")).toBeNull();
  });

  it("caps saved history to the most recent 10 items", () => {
    for (let index = 0; index < SAVED_ANALYSES_LIMIT + 2; index += 1) {
      saveAnalysis({
        id: `saved-${index}`,
        analysis: analysis({ role: `Role ${index}` }),
        sourceLabel: "Local mock result",
        savedAt: `2026-05-16T12:${index.toString().padStart(2, "0")}:00.000Z`,
      });
    }

    const savedAnalyses = readSavedAnalyses();

    expect(savedAnalyses).toHaveLength(SAVED_ANALYSES_LIMIT);
    expect(savedAnalyses[0].id).toBe("saved-11");
    expect(savedAnalyses.at(-1)?.id).toBe("saved-2");
  });

  it("clears saved analyses", () => {
    saveAnalysis({
      id: "saved-3",
      analysis: defaultAnalysis,
      sourceLabel: "Local mock result",
    });

    clearSavedAnalyses();

    expect(readSavedAnalyses()).toEqual([]);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(
      SAVED_ANALYSES_STORAGE_KEY,
    );
  });
});
