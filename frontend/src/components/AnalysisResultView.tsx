"use client";

import { useSearchParams } from "next/navigation";
import { LinkButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { CopyButton } from "@/components/CopyButton";
import { resolveAnalysis } from "@/lib/analysisSession";

const keywordTone = {
  skill: "border-blue-200 bg-blue-50 text-blue-800",
  tool: "border-violet-200 bg-violet-50 text-violet-800",
  impact: "border-emerald-200 bg-emerald-50 text-emerald-800",
  domain: "border-amber-200 bg-amber-50 text-amber-800",
};

export function AnalysisResultView() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const { analysis, isAiResult, isApiResult } = resolveAnalysis(
    source,
    searchParams.get("id") ?? undefined,
  );
  const role = searchParams.get("role") ?? analysis.role;
  const company = searchParams.get("company") ?? analysis.company;
  const resume = searchParams.get("resume") ?? analysis.resumeFile;
  const sourceLabel = isAiResult
    ? "AI result"
    : isApiResult
      ? "API mock result"
      : "Local mock result";

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Analysis results
            </p>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
              {sourceLabel}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {role} at {company}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Analysis for {resume}.{" "}
            {isAiResult
              ? "Results came from the optional OpenAI analysis endpoint."
              : isApiResult
                ? "Results came from the FastAPI deterministic mock endpoint."
              : "Results are generated from local sample data."}
          </p>
        </div>
        <LinkButton href="/dashboard" variant="secondary">
          Start new analysis
        </LinkButton>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <Card className="p-6">
          <p className="text-sm font-semibold text-slate-600">ATS match score</p>
          <div className="mt-4 flex items-end gap-2">
            <p className="text-6xl font-bold text-slate-950">{analysis.score}</p>
            <p className="pb-2 text-xl font-bold text-slate-500">/100</p>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-teal-600"
              style={{ width: `${analysis.score}%` }}
            />
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            {analysis.summary}
          </p>
        </Card>

        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-semibold text-slate-950">Missing keywords</h2>
              <p className="mt-1 text-sm text-slate-600">
                Add these naturally where they match your experience.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.missingKeywords.map((keyword) => (
                  <span
                    key={keyword.label}
                    className={`rounded-full border px-3 py-1 text-sm font-semibold ${keywordTone[keyword.category]}`}
                  >
                    {keyword.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-slate-950">Matched keywords</h2>
              <p className="mt-1 text-sm text-slate-600">
                These terms already strengthen your alignment.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.matchedKeywords.map((keyword) => (
                  <span
                    key={keyword.label}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800"
                  >
                    {keyword.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="p-6">
          <h2 className="font-semibold text-slate-950">Resume suggestions</h2>
          <ul className="mt-4 space-y-3">
            {analysis.suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="flex gap-3 text-sm leading-6 text-slate-600"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-600" />
                {suggestion}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-slate-950">AI rewrite examples</h2>
          <div className="mt-4 space-y-4">
            {analysis.rewrites.map((rewrite) => (
              <div key={rewrite.before} className="rounded-lg border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Before
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {rewrite.before}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                    After
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    {rewrite.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-950">
              Tailored cover letter preview
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {isAiResult
                ? "Generated by the optional OpenAI analysis endpoint."
                : "Static mock output for the portfolio demo."}
            </p>
          </div>
          <CopyButton text={analysis.coverLetter} />
        </div>
        <pre className="mt-5 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700">
          {analysis.coverLetter}
        </pre>
      </Card>
    </div>
  );
}
