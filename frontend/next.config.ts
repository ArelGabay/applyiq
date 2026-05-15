import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root,
    resolveAlias: {
      canvas: "./src/lib/emptyCanvas.ts",
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      canvas: path.join(root, "src/lib/emptyCanvas.ts"),
    };

    return config;
  },
};

export default nextConfig;
