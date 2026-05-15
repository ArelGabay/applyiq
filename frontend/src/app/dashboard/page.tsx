import { LinkButton } from "@/components/Button";

const recentAnalyses = [
  { role: "Senior Frontend Engineer", company: "Acme Corp", score: 78 },
  { role: "Full Stack Developer", company: "StartupXYZ", score: 65 },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-600">
            Upload a resume and job description to start your next analysis.
          </p>
        </div>
        <LinkButton href="/analysis">New analysis</LinkButton>
      </div>

      <div className="mb-10 rounded-xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
          <svg
            className="h-7 w-7 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Upload your resume</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
          Drag and drop a PDF or DOCX, or click to browse. Resume upload coming
          soon.
        </p>
        <button
          type="button"
          disabled
          className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-400"
        >
          Choose file (coming soon)
        </button>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent analyses</h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-600">Role</th>
                <th className="px-6 py-3 font-medium text-slate-600">Company</th>
                <th className="px-6 py-3 font-medium text-slate-600">ATS Score</th>
              </tr>
            </thead>
            <tbody>
              {recentAnalyses.map((item) => (
                <tr key={item.role} className="border-b border-slate-100 last:border-0">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.role}</td>
                  <td className="px-6 py-4 text-slate-600">{item.company}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                      {item.score}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">Mock data for portfolio preview.</p>
      </section>
    </div>
  );
}
