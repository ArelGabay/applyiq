import Link from "next/link";
import { type ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
};

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

const base =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
