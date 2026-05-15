import { type HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "muted";
};

export function Card({ tone = "default", className = "", ...props }: CardProps) {
  const toneClass =
    tone === "muted"
      ? "border-slate-200 bg-slate-50"
      : "border-slate-200 bg-white shadow-sm shadow-slate-200/60";

  return (
    <div
      className={`rounded-lg border ${toneClass} ${className}`}
      {...props}
    />
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
