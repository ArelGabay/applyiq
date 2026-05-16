"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/Button";
import { Card, SectionHeader } from "@/components/Card";
import { submitDashboardAnalysis } from "@/lib/analysisApi";
import {
  cleanDashboardInput,
  getResumeFileType,
  sampleJobDescription,
  selectAnalysisId,
} from "@/lib/dashboardModel";
import { mockAnalyses } from "@/lib/mockAnalysis";
import { extractResumeText } from "@/lib/resumeText";

export default function DashboardPage() {
  const router = useRouter();
  const [resumeName, setResumeName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeStatus, setResumeStatus] = useState<
    "idle" | "extracting" | "ready" | "error"
  >("idle");
  const [resumeError, setResumeError] = useState("");
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [company, setCompany] = useState("Acme Corp");
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState("");

  const selectedAnalysisId = useMemo(() => selectAnalysisId(role), [role]);

  async function handleAnalyze() {
    setApiError("");
    setResumeError("");
    const cleanInput = cleanDashboardInput({
      role,
      company,
      resumeName,
      resumeText,
    });

    if (resumeStatus === "extracting") {
      setResumeError("Wait for resume text extraction to finish before analyzing.");
      return;
    }

    if (!cleanInput.resumeText) {
      setResumeStatus("error");
      setResumeError("Choose a TXT, PDF, or DOCX resume before analyzing.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await submitDashboardAnalysis({
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
        selectedAnalysisId,
        role: cleanInput.role,
        company: cleanInput.company,
        resumeName: cleanInput.resumeName,
        resumeText: cleanInput.resumeText,
        jobDescription,
      });

      if (result.apiError) {
        setApiError(result.apiError);
      }

      router.push(result.route);
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleResumeFileChange(file: File | undefined) {
    setResumeError("");
    setApiError("");

    if (!file) {
      setResumeName("");
      setResumeText("");
      setResumeStatus("idle");
      return;
    }

    setResumeName(file.name);
    setResumeText("");
    setResumeStatus("extracting");

    try {
      const result = await extractResumeText(file);

      if (!result.text) {
        throw new Error("No readable text was found in this resume.");
      }

      setResumeText(result.text);
      setResumeStatus("ready");
    } catch (error) {
      setResumeText("");
      setResumeStatus("error");
      setResumeError(
        error instanceof Error
          ? error.message
          : "Could not extract text from this resume.",
      );
    }
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

            <div className="block">
              <span className="text-sm font-semibold text-slate-800">
                Resume file
              </span>
              <div className="mt-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">
                      {resumeName || "No resume selected"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Upload a TXT, PDF, or DOCX resume. Text is extracted in this
                      browser before analysis.
                    </p>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        resumeStatus === "ready"
                          ? "text-teal-700"
                          : resumeStatus === "error"
                            ? "text-amber-700"
                            : "text-slate-500"
                      }`}
                    >
                      {resumeStatus === "extracting"
                        ? "Extracting resume text..."
                        : resumeStatus === "ready"
                          ? `Ready: ${resumeText.length.toLocaleString()} characters extracted.`
                          : resumeStatus === "error"
                            ? resumeError
                            : "Choose a file to begin."}
                    </p>
                  </div>
                  <label className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50">
                    Choose file
                    <input
                      type="file"
                      accept=".txt,.pdf,.docx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="sr-only"
                      onChange={(event) =>
                        void handleResumeFileChange(event.target.files?.[0])
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            {resumeStatus === "ready" ? (
              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-teal-950">
                      Ready for mock analysis
                    </p>
                    <p className="mt-1 text-sm text-teal-800">
                      ApplyIQ parsed this resume in your browser.
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-700">
                    Parsed
                  </span>
                </div>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="font-semibold text-teal-950">Filename</dt>
                    <dd className="mt-1 truncate text-teal-800">{resumeName}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-teal-950">File type</dt>
                    <dd className="mt-1 text-teal-800">
                      {getResumeFileType(resumeName)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-teal-950">
                      Extracted text
                    </dt>
                    <dd className="mt-1 text-teal-800">
                      {resumeText.length.toLocaleString()} characters
                    </dd>
                  </div>
                </dl>
              </div>
            ) : null}

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
                    ? "Uses the configured FastAPI endpoint, tries optional OpenAI analysis, then falls back safely."
                    : "This generates a polished local mock result. No files leave the browser."}
                </p>
                {apiError ? (
                  <p className="mt-2 text-sm font-medium text-amber-700">
                    {apiError}
                  </p>
                ) : null}
              </div>
              <Button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || resumeStatus === "extracting"}
              >
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
