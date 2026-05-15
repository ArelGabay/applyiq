export type Keyword = {
  label: string;
  category: "skill" | "tool" | "impact" | "domain";
};

export type Rewrite = {
  before: string;
  after: string;
};

export type AnalysisResult = {
  id: string;
  role: string;
  company: string;
  score: number;
  summary: string;
  resumeFile: string;
  analyzedAt: string;
  missingKeywords: Keyword[];
  matchedKeywords: Keyword[];
  suggestions: string[];
  rewrites: Rewrite[];
  coverLetter: string;
};

export const mockAnalyses: AnalysisResult[] = [
  {
    id: "frontend-engineer",
    role: "Senior Frontend Engineer",
    company: "Acme Corp",
    score: 82,
    resumeFile: "Arel_Gabay_Resume.pdf",
    analyzedAt: "Today",
    summary:
      "Strong frontend match with solid React experience. Add more job-specific platform language and measurable ownership to improve ATS alignment.",
    missingKeywords: [
      { label: "GraphQL", category: "tool" },
      { label: "CI/CD", category: "tool" },
      { label: "Accessibility", category: "impact" },
      { label: "Design systems", category: "domain" },
      { label: "AWS", category: "tool" },
    ],
    matchedKeywords: [
      { label: "React", category: "skill" },
      { label: "TypeScript", category: "skill" },
      { label: "Next.js", category: "tool" },
      { label: "Performance", category: "impact" },
      { label: "Component architecture", category: "domain" },
    ],
    suggestions: [
      "Add one bullet that names React, TypeScript, and Next.js together in a recent project.",
      "Quantify frontend impact with load-time, conversion, or delivery-speed metrics.",
      "Mirror the job description's language around accessibility and design systems.",
      "Add CI/CD or deployment ownership if you have shipped production releases.",
    ],
    rewrites: [
      {
        before: "Built reusable components for web apps.",
        after:
          "Built a reusable React and TypeScript component library that reduced duplicate UI work and improved release consistency across product teams.",
      },
      {
        before: "Improved page performance.",
        after:
          "Improved Next.js page performance by optimizing rendering patterns and asset loading, creating a faster experience for high-traffic user flows.",
      },
    ],
    coverLetter:
      "Dear Acme Corp hiring team,\n\nI am excited to apply for the Senior Frontend Engineer role. My experience building React, TypeScript, and Next.js interfaces aligns closely with your need for reliable, scalable frontend systems. I enjoy translating product requirements into clean component architecture, improving performance, and collaborating across design and engineering.\n\nApplyIQ's mock analysis shows a strong match for the role, with opportunities to emphasize design systems, accessibility, and CI/CD ownership. I would bring the same product-minded approach to Acme Corp: shipping thoughtful UI, strengthening engineering quality, and helping teams move faster with confidence.\n\nThank you for your consideration.\nArel Gabay",
  },
  {
    id: "full-stack",
    role: "Full Stack Developer",
    company: "Northstar Labs",
    score: 74,
    resumeFile: "Arel_Gabay_Resume.pdf",
    analyzedAt: "Yesterday",
    summary:
      "Good overall software engineering fit. Backend and deployment keywords are underrepresented compared with the target job description.",
    missingKeywords: [
      { label: "FastAPI", category: "tool" },
      { label: "PostgreSQL", category: "tool" },
      { label: "Docker", category: "tool" },
      { label: "REST APIs", category: "domain" },
    ],
    matchedKeywords: [
      { label: "TypeScript", category: "skill" },
      { label: "Python", category: "skill" },
      { label: "React", category: "skill" },
      { label: "Testing", category: "impact" },
    ],
    suggestions: [
      "Add a backend project bullet that names Python, API design, and database work.",
      "Mention REST API ownership in the experience section if applicable.",
      "Include deployment tooling such as Docker or CI/CD in the skills section.",
    ],
    rewrites: [
      {
        before: "Worked on frontend and backend features.",
        after:
          "Delivered full-stack features across React, Python APIs, and database-backed workflows, improving product reliability from UI to service layer.",
      },
    ],
    coverLetter:
      "Dear Northstar Labs hiring team,\n\nI am excited to apply for the Full Stack Developer role. I bring hands-on experience across TypeScript, React, and Python, with a strong interest in building clear product workflows from interface to API.\n\nFor this role, I would emphasize my ability to learn quickly, structure maintainable code, and ship practical features without overcomplicating the system. I would welcome the chance to contribute to Northstar Labs' product and engineering goals.\n\nThank you for your consideration.\nArel Gabay",
  },
];

export const defaultAnalysis = mockAnalyses[0];

export function findAnalysis(id?: string | string[]) {
  const normalizedId = Array.isArray(id) ? id[0] : id;
  return mockAnalyses.find((analysis) => analysis.id === normalizedId) ?? defaultAnalysis;
}
