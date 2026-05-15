import { LinkButton } from "@/components/Button";

const features = [
  {
    title: "ATS Score",
    description: "See how well your resume matches the job description at a glance.",
  },
  {
    title: "Missing Keywords",
    description: "Identify critical skills and terms recruiters and ATS systems look for.",
  },
  {
    title: "AI Rewrites",
    description: "Get tailored suggestions to strengthen bullet points and summaries.",
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              AI-powered resume optimization
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Land more interviews with an ATS-ready resume
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Upload your resume and a job description. ApplyIQ scores your match,
              surfaces missing keywords, and suggests improvements — built for your
              portfolio and ready to scale.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LinkButton href="/dashboard">Start optimizing</LinkButton>
              <LinkButton href="/analysis" variant="secondary">
                View sample analysis
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            Everything you need to stand out
          </h2>
          <p className="mt-2 text-slate-600">
            A focused toolkit for job seekers — no clutter, no overengineering.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
