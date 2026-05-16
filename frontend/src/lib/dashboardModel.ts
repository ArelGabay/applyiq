export const sampleJobDescription =
  "We are looking for a Senior Frontend Engineer with strong React, TypeScript, Next.js, accessibility, performance, and design system experience. Familiarity with GraphQL, CI/CD, and AWS is a plus.";

export function getResumeFileType(fileName: string) {
  const extension = fileName.split(".").pop()?.toUpperCase();
  return extension ? `${extension} file` : "Resume file";
}

export function selectAnalysisId(role: string) {
  const normalizedRole = role.toLowerCase();
  return normalizedRole.includes("full") ? "full-stack" : "frontend-engineer";
}

export function cleanDashboardInput(input: {
  role: string;
  company: string;
  resumeName: string;
  resumeText: string;
}) {
  return {
    role: input.role.trim() || "Senior Frontend Engineer",
    company: input.company.trim() || "Acme Corp",
    resumeName: input.resumeName.trim() || "Resume.pdf",
    resumeText: input.resumeText.trim(),
  };
}
