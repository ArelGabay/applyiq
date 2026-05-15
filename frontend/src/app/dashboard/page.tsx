"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/Button";
import { Card, SectionHeader } from "@/components/Card";
import { API_ANALYSIS_STORAGE_KEY, mockAnalyses } from "@/lib/mockAnalysis";

const sampleJobDescription =
  "We are looking for a Senior Frontend Engineer with strong React, TypeScript, Next.js, accessibility, performance, and design system experience. Familiarity with GraphQL, CI/CD, and AWS is a plus.";

export default function DashboardPage() {
  const router = useRouter();
  const [resumeName, setResumeName] = useState("Arel_Gabay_Resume.pdf");
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [company, setCompany] = useState("Acme Corp");
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState("");

  const selectedAnalysisId = useMemo(() => {
    const normalizedRole = role.toLowerCase();
    return normalizedRole.includes("full")
      ? "full-stack"
      : "frontend-engineer";
  }, [role]);

  async function handleAnalyze() {
    setApiError("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const cleanRole = role.trim() || "Senior Frontend Engineer";
    const cleanCompany = company.trim() || "Acme Corp";
    const cleanResumeName = resumeName.trim() || "Resume.pdf";

    if (apiUrl) {
      setIsAnalyzing(true);

      try {
        const response = await fetch(`${apiUrl}/analysis/mock`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: cleanRole,
            company: cleanCompany,
            resume_name: cleanResumeName,
            job_description: jobDescription,
          }),
        });

        if (!response.ok) {
          throw new Error("API mock analysis failed");
        }

        const analysis = await response.json();
        sessionStorage.setItem(API_ANALYSIS_STORAGE_KEY, JSON.stringify(analysis));
        router.push("/analysis?source=api");
        return;
      } catch {
        setApiError(
          "The API is not reachable, so ApplyIQ used the built-in mock fallback.",
        );
      } finally {
        setIsAnalyzing(false);
      }
    }

    const params = new URLSearchParams({
      id: selectedAnalysisId,
      role: cleanRole,
      company: cleanCompany,
      resume: cleanResumeName,
    });

    router.push(`/analysis?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="Dashboard"
          title="Create a resume analysis"
          description="Use the mock workflow to preview how ApplyIQ will guide a job seeker from resume upload to tailored recommendations."
        />
        <LinkButton href="/analysis" variant="secondary">
          View sample
        </LinkButton>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Card className="p-6">
          <div className="grid gap-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-800">
                Target role
              </span>
              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                placeholder="Senior Frontend Engineer"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-800">
                Company
              </span>
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                placeholder="Acme Corp"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-800">
                Resume file
              </span>
              <div className="mt-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">{resumeName}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Mock upload. PDF and DOCX support will connect later.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      setResumeName(
                        resumeName.includes("Arel")
                          ? "Frontend_Resume_Targeted.docx"
                          : "Arel_Gabay_Resume.pdf",
                      )
                    }
                  >
                    Swap file
                  </Button>
                </div>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-800">
                Job description
              </span>
              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                rows={8}
                className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                placeholder="Paste the job description here..."
              />
            </label>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {process.env.NEXT_PUBLIC_API_URL
                    ? "Uses the configured FastAPI mock endpoint, then stores the result in this browser."
                    : "This generates a polished local mock result. No files leave the browser."}
                </p>
                {apiError ? (
                  <p className="mt-2 text-sm font-medium text-amber-700">
                    {apiError}
                  </p>
                ) : null}
              </div>
              <Button type="button" onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? "Analyzing..." : "Analyze resume"}
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="font-semibold text-slate-950">Analysis preview</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              ApplyIQ will compare the resume against the target job description
              and return a score, keywords, resume rewrites, and a cover letter
              draft.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {["ATS score", "Keywords", "Rewrites", "Cover letter"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-slate-950">Recent analyses</h2>
            <div className="mt-4 space-y-3">
              {mockAnalyses.map((item) => (
                <Link
                  key={item.id}
                  href={`/analysis?id=${item.id}`}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {item.role}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.company} · {item.analyzedAt}
                    </p>
                  </div>
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                    {item.score}%
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
