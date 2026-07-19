# BRAND-READ: replicate the company, don't recolour the imagen

The imagen gives you the plumbing (config, a11y, reveal, CTAs, section spine).
**Everything a visitor sees is a placeholder to replace.** A good bar-for-* site
looks like it was built *by* the company: same brand, same layout language, same
motion feel, not the imagen with new colours. Work top to bottom.

## 1. Read the brand live (never from memory)

Open the company's site in Chrome and pull the real values, do not guess:

- **Colours**: `getComputedStyle` on `body`, headings, buttons, links for exact
  hex. Fill `--imagen-bg / --imagen-surface / --imagen-border / --imagen-ink / --imagen-ink-soft /
  --imagen-accent / --imagen-accent-ink` in `src/marketing/imagen/imagen.css`.
- **Type**: the real display + body faces. Their brand face is often licensed;
  use the closest free Google-font analog via `next/font/google` in
  `app/layout.tsx` (e.g. HoneyBook's Aeonik → DM Sans; Lemonade → Merriweather +
  Lato). Expose it as `--imagen-font`.
- **Shape**: corner radius (`--imagen-radius`; `0` for square brands like WeDev),
  border weights, shadow style.
- **Screenshots**: capture the hero, one feature section, and the footer.

## 2. Replicate the layout, not just the palette

Reproduce the company's actual homepage composition, hero arrangement, section
patterns, signature graphics, component shapes, rebuilt from scratch in the
scoped CSS. Matching only the palette reads as a recolour. Adjust the section
spine in `ImagenApp.tsx` to mirror how *they* structure a page.

## 3. Language & direction

EN/LTR is the default. For Israeli companies use HE/RTL, set `lang="he"
dir="rtl"` in `app/layout.tsx` (the scaffold script does this from `--lang he
--dir rtl`) and verify no LTR leaks. Write the copy in that language.

## 4. The centerpiece

Replace `Centerpiece.tsx` entirely. Build a from-scratch inline-SVG that reframes
the company's own signature motif as Bar's pipeline/story. Round coordinates to
2dp (hydration). Match their animation *feel*, CSS + SVG, reduced-motion safe;
add GSAP only if a specific scroll effect needs it.

## 5. Imagery / photography

Match the company's photographic *treatment* (crop, tone, framing) using **Bar's
own proof imagery**: never the company's copyrighted photos or assets. Some
sites drop a portrait entirely for a monogram/mark (honeybook, willow); that's
fine.

## 6. Copy (honest, terse, on-brand)

Speak the company's language, addressed to them. First person, plain, terse CV
register, not SaaS pitch. **No em dashes, no years-of-experience number, never
showcase bar_builds.** Lead with shipped, public proof. Stay honest to
`jobs/cv.md`, do not claim tools/skills it doesn't support. Map the four focus
cards to the actual job description; pull selected-work links from
`bar_builds/site/src/portfolio/data/portfolio.ts`.

## 7. Swap the CV + OG card

Replace `public/cv/Bar_Moshe_CV.pdf` with the brand-themed cv-forge output, and
restyle `app/opengraph-image.tsx` in the brand (Latin text only, Satori can't
render Hebrew).

## 8. Verify before shipping

`npm run lint` + `npm run build` green, drive the page, **screenshot it to judge
the production bar**, confirm reduced-motion shows a clean static frame, all CTAs
work, and `robots` noindex is present. On animated/RTL pages verify grid columns
+ tokens via `getComputedStyle`, not just the screenshot.
