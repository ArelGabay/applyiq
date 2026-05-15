import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} ApplyIQ. Portfolio project.
        </p>
        <div className="flex gap-6">
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link href="/analysis" className="text-sm text-slate-500 hover:text-indigo-600">
            Analysis
          </Link>
        </div>
      </div>
    </footer>
  );
}
