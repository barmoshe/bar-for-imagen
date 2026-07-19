import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Accessibility is a deploy gate (WCAG 2.2 AA floor). `next lint` was removed in
// Next 16, so eslint runs directly (see package.json "lint"). eslint-config-next
// already bundles jsx-a11y/recommended, so the a11y rules are active without
// re-registering the plugin (doing so errors).
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // A one-page site with no next/link navigation: the pages-router-era
  // no-html-link-for-pages rule does not apply.
  {
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
