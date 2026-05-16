import Image from "next/image";
import { LinkButton } from "@/components/Button";
import { Card, SectionHeader } from "@/components/Card";

const features = [
  {
    title: "ATS match score",
    description:
      "Estimate role alignment with deterministic keyword coverage and focused recommendations.",
  },
  {
    title: "Keyword gap analysis",
    description:
      "Compare a resume against the job description and surface missing terms that matter.",
  },
  {
    title: "Rewrite-ready feedback",
    description:
      "Turn vague resume bullets into stronger, role-specific positioning with template-based output.",
  },
];

const workflow = [
  "Upload resume",
  "Paste job description",
  "Review tailored analysis",
];

const previewAnalysis = {
  role: "Senior Frontend Engineer",
  company: "Acme Corp",
  score: 79,
  summary:
    "ApplyIQ found 4 of 8 target signals. The resume already reflects React, TypeScript, and Next.js. Tightening AWS, GraphQL, and CI/CD would make the application feel more tailored.",
};

export default function LandingPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
              Portfolio-ready ATS optimization demo
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Turn any resume into a focused job application strategy.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              ApplyIQ helps job seekers compare their resume against a job
              description, spot missing keywords, preview stronger bullet
              rewrites, and generate a tailored cover letter using deterministic
              ATS-style analysis.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/dashboard">Analyze a resume</LinkButton>
              <LinkButton href="/analysis" variant="secondary">
                View sample results
              </LinkButton>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-200 pt-6">
              {[
                ["79%", "API mock score"],
                ["8", "target signals"],
                ["3", "core gaps"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-slate-950">{value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {previewAnalysis.role}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {previewAnalysis.company} API mock preview
                </p>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
                {previewAnalysis.score}%
              </span>
            </div>
            <div className="mt-5 grid gap-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Image src="/file.svg" alt="" width={18} height={18} />
                  <p className="text-sm font-semibold text-slate-800">
                    Resume signal summary
                  </p>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  {previewAnalysis.summary}
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Deterministic alignment
                  </span>
                  <span className="font-semibold text-slate-950">
                    {previewAnalysis.score} / 100
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[79%] rounded-full bg-teal-600" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                    Missing
                  </p>
                  <p className="mt-2 text-sm font-semibold text-amber-950">
                    GraphQL, CI/CD, AWS
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                    Matched
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-950">
                    React, TypeScript, Next.js
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeader
          eyebrow="How it works"
          title="A focused workflow for better applications"
          description="The MVP is intentionally simple: enough product depth to feel real, with browser parsing and deterministic mock analysis that keep the demo fast and reliable."
          className="mb-10"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {workflow.map((step, index) => (
            <Card key={step} className="p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 font-semibold text-slate-950">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {index === 0
                  ? "Upload a TXT, PDF, or DOCX resume and extract text in the browser."
                  : index === 1
                    ? "Paste the job description and target role to guide deterministic keyword matching."
                    : "Review score, keywords, rewrite examples, and a tailored cover letter."}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader
            eyebrow="MVP features"
            title="Built to show the product, not just describe it"
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <h3 className="font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
