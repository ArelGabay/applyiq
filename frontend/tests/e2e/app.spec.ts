import { expect, type Page, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

async function clearBrowserStorage(page: Page) {
  await page.goto("/");
  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
}

test("public routes load", async ({ page }) => {
  await clearBrowserStorage(page);
  await expect(
    page.getByRole("heading", {
      name: "Turn any resume into a focused job application strategy.",
    }),
  ).toBeVisible();

  await page.goto("/dashboard");
  await expect(
    page.getByRole("heading", { name: "Create a resume analysis" }),
  ).toBeVisible();

  await page.goto("/analysis");
  await expect(page.getByText("Analysis results")).toBeVisible();
  await expect(page.getByText("Local mock result")).toBeVisible();
});

test("dashboard analysis can be saved, reopened, and cleared", async ({
  page,
}, testInfo) => {
  const resumePath = join(
    tmpdir(),
    `applyiq-resume-${testInfo.workerIndex}-${Date.now()}.txt`,
  );

  await writeFile(
    resumePath,
    [
      "Senior Frontend Engineer",
      "Built React, TypeScript, and Next.js interfaces.",
      "Improved accessibility, performance, testing, and component architecture.",
    ].join("\n"),
  );

  await clearBrowserStorage(page);
  await page.goto("/dashboard");
  await page.locator('input[type="file"]').setInputFiles(resumePath);
  await expect(page.getByText("Ready for mock analysis")).toBeVisible();

  await page.getByRole("button", { name: "Analyze resume" }).click();
  await expect(page).toHaveURL(/\/analysis/);
  await expect(page.getByText("Local mock result")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Senior Frontend Engineer at Acme Corp" }),
  ).toBeVisible();

  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "Recent analyses" })).toBeVisible();
  await expect(page.getByText("Local mock result")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Local mock result/ }),
  ).toBeVisible();

  await page.getByRole("link", { name: /Local mock result/ }).click();
  await expect(page).toHaveURL(/\/analysis\?saved=/);
  await expect(page.getByText("Local mock result")).toBeVisible();

  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(page.getByRole("button", { name: "Clear" })).toBeHidden();
  await expect(
    page.locator("main").getByRole("link", { name: /Sample/ }),
  ).toHaveCount(2);
});
