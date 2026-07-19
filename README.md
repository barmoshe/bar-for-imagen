# bar-for-imagen

A one-page application site, Bar Moshe, presented in Imagen's own brand, sent
as the application. Next.js 16 + React 19 + TypeScript, plain CSS, deployed on
Vercel.

> **Not affiliated.** This is an independent application site built by Bar Moshe.
> Company names, marks, and brand styling are used nominatively to address the
> company; it does not claim any affiliation or endorsement, and reuses none of
> the company's proprietary assets. The page is private (`noindex`) and shared by
> direct link only.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # jsx-a11y accessibility gate (must pass)
npm run build
```

## Re-brand

All brand values live in `src/marketing/imagen/imagen.css` (`.imagen-root` tokens).
Work through `BRAND-READ.md`, read the company's real tokens off their live
site, replace the placeholders, replicate their layout, and rewrite the copy.

## Deploy

Steady state: push `main` — the Vercel git integration builds every push.

```bash
git push                   # ships → https://bar-for-imagen.vercel.app
```

One-time bootstrap for a new fork only: `npx vercel --prod` to create the Vercel
project, then `npx vercel git connect --yes` (a CLI-created project is not linked
to its repo — pushes silently never build until connected). After that, the CLI
is a fallback only, run from a clone synced to `origin/main`.

If Vercel's free daily deploy cap is hit, a GitHub-Pages static mirror is wired
in `next.config.ts` (`GH_PAGES=1 npm run build`), a fallback, not the canonical
URL. See `references/bar-for-site.md` in the operator repo for the full flow.

## Analytics

The page loads a small beacon (`app/layout.tsx`) that reports one visit per
browser session to [bar-for-companies](https://bar-for-companies.vercel.app),
the gallery of all these application sites, so its visit counter reflects real
traffic. No personal data leaves the browser — just a page-view ping.
