import { LinkButton } from "@/components/Button";

const missingKeywords = ["TypeScript", "React", "CI/CD", "GraphQL", "AWS"];
const suggestions = [
  "Quantify impact in your most recent role (e.g. reduced load time by 40%).",
  "Add React and TypeScript to your skills section — both appear in the job description.",
  "Mirror the job title phrasing in your summary for stronger ATS alignment.",
];

export default function AnalysisPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600">Analysis results</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Senior Frontend Engineer — Acme Corp
        </h1>
        <p className="mt-1 text-slate-600">Sample analysis using mock data.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-8 lg:col-span-1">
          <p className="text-sm font-medium text-slate-600">ATS Match Score</p>
          <p className="mt-2 text-5xl font-bold text-indigo-600">78%</p>
          <p className="mt-2 text-sm text-slate-600">
            Good match. Address missing keywords to improve your score.
          </p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[78%] rounded-full bg-indigo-600" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h2 className="font-semibold text-slate-900">Missing keywords</h2>
          <p className="mt-1 text-sm text-slate-600">
            Terms from the job description not found in your resume.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {missingKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Resume suggestions</h2>
        <ul className="mt-4 space-y-3">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
              {suggestion}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex gap-4">
        <LinkButton href="/dashboard" variant="secondary">
          Back to dashboard
        </LinkButton>
        <button
          type="button"
          disabled
          className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-400"
        >
          AI rewrite (coming soon)
        </button>
      </div>
    </div>
  );
}
