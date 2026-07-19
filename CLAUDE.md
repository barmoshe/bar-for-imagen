# CLAUDE.md: bar-for-imagen (application site)

Per-site context for an agent working **inside this clone**. This is a
`bar-for-*` "CV-as-marketing-website": a one-page site that presents Bar as a
marketing site for himself, built in the target company's own visual language,
sent as the application. Scaffolded from `bar_builds/templates/bar-for-x/`.

## The one rule

**Replicate the company, do not recolour the imagen.** Everything a visitor
sees, palette, fonts, layout composition, the centerpiece motif, imagery,
animation, copy, language/direction, is reinvented in the target's brand, read
live off their site. The imagen only gives you the plumbing. See `BRAND-READ.md`
for the replication checklist, and `references/bar-for-site.md` in `bar_builds`
for the full playbook.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript. Plain CSS, **no
  Tailwind**. Deployed on Vercel at `https://bar-for-imagen.vercel.app`.
- Brand tokens live at the top of `src/marketing/imagen/imagen.css`, scoped to
  `.imagen-root`. Re-brand from there.
- `src/marketing/imagen/marketing-base.css` is the brand-agnostic reset + a11y
  floor + scroll-reveal mechanics, keep it verbatim.
- Scroll reveal is the `data-reveal`/`data-in` **attribute** pair (`src/lib/
  reveal.ts`), not a toggled class, so it survives React re-render (ADR 0187).
- Contact CTAs deep-link via `src/lib/contact.ts` (Bar's own WhatsApp + email).
- `app/layout.tsx` loads a visit-tracking beacon (`<script
  data-bar-for-id="imagen">`, hosted at `bar-for-companies.vercel.app/track.js`)
  that reports one hit per browser session to the gallery's visit counter
  (ADR 0209). `new-bar-for.mjs` re-slugs `data-bar-for-id` to the new site's id
  automatically — don't strip this tag when re-branding.

## Conventions

- `robots: noindex` stays on, this is a private link, not a public page.
- Accessibility is a deploy gate: `npm run lint` (jsx-a11y) must pass. Skip-link,
  one `<main>`, ordered headings, alt text, AA contrast, reduced-motion safe.
- Copy: first person, plain, terse CV register. **No em dashes, no
  years-of-experience number, never showcase bar_builds.** Stay honest to
  `jobs/cv.md`, do not claim tools it doesn't support.
- Round inline-SVG coordinates to 2dp to avoid a hydration mismatch.
- The GH-Pages export fallback (ADR 0169) is wired in `next.config.ts`; the CV
  link is base-path-safe in `ImagenApp.tsx`.

## Verify + ship

`npm install` → `npm run lint` → `npm run build` (all green) → drive the page and
screenshot it to judge the production bar → **ship = `git push`** (the git
integration builds every push; ADR 0216). One-time bootstrap for a new project
only: `npx vercel --prod` to create the Vercel project + confirm a live `200` +
`noindex`, then `npx vercel git connect --yes` — a project created by a CLI deploy
is not linked to its GitHub repo and pushes silently never build. After that the
CLI is a guarded fallback only (clone synced to `origin/main` first); CLI-deploying
on top of a push double-burns the daily deploy quota. Register back in `bar_builds`: `.repos.json` (kind
`lead`/`job`, `workshop: jobs/<slug>`) and the companies gallery. A routine site
is **work, not a decision**: no new ADR unless the playbook itself changes.
