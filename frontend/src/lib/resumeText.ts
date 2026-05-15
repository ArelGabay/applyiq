type ExtractionResult = {
  text: string;
  kind: "txt" | "pdf" | "docx";
};

const supportedExtensions = [".txt", ".pdf", ".docx"];

function getExtension(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : "";
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

async function extractPdfText(file: File) {
  const pdfjs = await import("pdfjs-dist/webpack");

  const arrayBuffer = await file.arrayBuffer();
  const document = await pdfjs.getDocument({
    data: new Uint8Array(arrayBuffer),
  }).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");

    pages.push(pageText);
  }

  return normalizeText(pages.join(" "));
}

async function extractDocxText(file: File) {
  const mammoth = await import("mammoth/mammoth.browser");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return normalizeText(result.value);
}

export async function extractResumeText(file: File): Promise<ExtractionResult> {
  const extension = getExtension(file.name);

  if (!supportedExtensions.includes(extension)) {
    throw new Error("Upload a TXT, PDF, or DOCX resume.");
  }

  if (extension === ".txt") {
    return {
      text: normalizeText(await file.text()),
      kind: "txt",
    };
  }

  if (extension === ".pdf") {
    return {
      text: await extractPdfText(file),
      kind: "pdf",
    };
  }

  return {
    text: await extractDocxText(file),
    kind: "docx",
  };
}
