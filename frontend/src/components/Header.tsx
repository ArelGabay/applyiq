import Link from "next/link";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analysis", label: "Analysis" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            A
          </span>
          ApplyIQ
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
