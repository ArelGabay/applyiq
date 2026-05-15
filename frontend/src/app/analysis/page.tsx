import { Suspense } from "react";
import { AnalysisResultView } from "@/components/AnalysisResultView";

export default function AnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
          Loading analysis...
        </div>
      }
    >
      <AnalysisResultView />
    </Suspense>
  );
}
