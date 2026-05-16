import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} ApplyIQ. Deterministic ATS resume demo.
        </p>
        <div className="flex gap-6">
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-950">
            Dashboard
          </Link>
          <Link href="/analysis" className="text-sm text-slate-500 hover:text-slate-950">
            Sample analysis
          </Link>
        </div>
      </div>
    </footer>
  );
}
