import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

// Deploy target: Vercel (Node host), rooted at `/`. See references/bar-for-site.md.
//
// GitHub-Pages fallback (ADR 0169): when Vercel's free daily deploy cap is hit,
// ship a static mirror instead. `GH_PAGES=1 npm run build` switches to a static
// export under `/bar-for-imagen`. The mirror is a fallback, not the canonical
// URL, outreach and the registries keep pointing at the Vercel deployment.
//   Note: basePath does NOT rewrite plain <a href> strings, so link the CV via
//   `${NEXT_PUBLIC_BASE_PATH ?? ''}` (see src/marketing/imagen/ImagenApp.tsx).
const isPages = process.env.GH_PAGES === "1";
const basePath = "/bar-for-imagen";

const nextConfig: NextConfig = {
  // This app is cloned next to bar_builds, which has lockfiles higher up. Pin
  // Turbopack's workspace root to this folder so it does not infer a parent.
  turbopack: { root },
  ...(isPages
    ? {
        output: "export",
        basePath,
        images: { unoptimized: true },
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
      }
    : {}),
};

export default nextConfig;
