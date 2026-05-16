import { describe, expect, it } from "vitest";
import { cleanDashboardInput, getResumeFileType, selectAnalysisId } from "./dashboardModel";

describe("dashboardModel", () => {
  it("selects the full-stack sample for full-stack roles", () => {
    expect(selectAnalysisId("Full Stack Developer")).toBe("full-stack");
  });

  it("selects the frontend sample for other roles", () => {
    expect(selectAnalysisId("Senior Frontend Engineer")).toBe("frontend-engineer");
  });

  it("cleans dashboard input with stable defaults", () => {
    expect(
      cleanDashboardInput({
        role: " ",
        company: "  ",
        resumeName: "",
        resumeText: "  React TypeScript  ",
      }),
    ).toEqual({
      role: "Senior Frontend Engineer",
      company: "Acme Corp",
      resumeName: "Resume.pdf",
      resumeText: "React TypeScript",
    });
  });

  it("formats selected resume file types", () => {
    expect(getResumeFileType("resume.pdf")).toBe("PDF file");
    expect(getResumeFileType("")).toBe("Resume file");
  });
});
