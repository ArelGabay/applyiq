import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApplyIQ — ATS Resume Optimization Demo",
  description:
    "AI-powered ATS resume optimization demo with resume scoring, keyword gaps, rewrite examples, and tailored cover letter output.",
  applicationName: "ApplyIQ",
  openGraph: {
    title: "ApplyIQ — ATS Resume Optimization Demo",
    description:
      "Upload a resume, compare it with a job description, and preview ATS-focused recommendations using polished mock AI data.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
