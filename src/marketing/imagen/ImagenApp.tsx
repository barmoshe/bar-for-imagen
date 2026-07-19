"use client";

import { useState, useRef } from "react";
import { useReveal } from "@/src/lib/reveal";
import { buildMailtoHref, buildWhatsAppHref } from "@/src/lib/contact";
import { Centerpiece } from "./Centerpiece";

// One-page application site for Imagen's Full Stack Engineer posting, built in
// Imagen's own visual language (read live off imagen-ai.com: Prody/Graphik type
// system, coral on white with ink bands, tint cards, marquees, feature tabs,
// FAQ accordion). Copy stays honest to bar_builds/jobs/cv.md; Electron client
// work confirmed by Bar (project unnamed, client's IP).
//
// basePath does not rewrite plain <a href> strings, so prefix static asset links
// (the CV) with NEXT_PUBLIC_BASE_PATH for the GH_PAGES mirror (ADR 0169). Keep
// `CV` a plain string literal so cv-forge's rewiring regex still matches it.
const CV = "/Bar_Moshe_CV_Imagen.pdf";
const CV_HREF = (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + CV;

const GITHUB = "https://github.com/barmoshe";

// Marquee of shipped things, mirroring Imagen's photographer-name marquee.
const SHIPPED = [
  "Catalogue Orchestrator",
  "MDP",
  "Temporal Code Exchange",
  "MIDI Agent",
  "Biome Synth",
  "Bloom Garden",
  "Entailer",
  "Israelify",
  "Apartment Hunter",
  "Trip Planner",
  "Creative Harness",
];

// Stack-word marquee for the dark band, mirroring "YOUR STORY. YOUR GENRE."
const STACK_WORDS = [
  "TypeScript",
  "React",
  "Node.js",
  "Electron",
  "Next.js",
  "Python",
  "MongoDB",
  "SQL",
  "AWS",
  "Docker",
];

// Six tabs, mirroring Imagen's six feature tabs.
const TABS = [
  {
    id: "frontend",
    label: "Frontend",
    body: "TypeScript and React are my daily tools, Next.js when a site needs to ship fast. I care about components that survive the third feature built on top of them.",
  },
  {
    id: "backend",
    label: "Backend",
    body: "Node.js services and REST APIs, Python when the job calls for it. At Joomsy, an early-stage startup, I'm the primary developer, so the back half of the product is mine too.",
  },
  {
    id: "ai",
    label: "AI & agents",
    body: "LLM apps, MCP servers, agent harnesses and evals. I ship AI products and use AI tooling to build faster, with quality gates, not guesswork.",
  },
  {
    id: "desktop",
    label: "Desktop",
    body: "I've built with Electron in client work: main and renderer processes, IPC, packaging. A desktop app on Chromium and Node runs on the exact stack I write every day.",
  },
  {
    id: "devops",
    label: "DevOps",
    body: "AWS, Docker, Kubernetes, Terraform, CI/CD. I trained on EKS at Wix's DevOps workshop and I run my own deploys end to end, from repo to production.",
  },
  {
    id: "data",
    label: "Data",
    body: "MongoDB behind shipped projects with real auth and middleware. Schema design that survives product pivots, and I'm comfortable on either side of an ORM, SQL included.",
  },
];

// Tint cards mapped to the job description, plain CV-register statements.
const FIT_CARDS = [
  {
    tone: "blush",
    title: "TypeScript, my primary language.",
    body: "TypeScript is my first choice across web, desktop and tooling, with the HTML and CSS craft underneath it.",
  },
  {
    tone: "ice",
    title: "Electron experience.",
    body: "I've shipped with Electron in client work: main and renderer processes, IPC, packaging. The ramp to a desktop app built on it is short.",
  },
  {
    tone: "lime",
    title: "Video pipeline experience.",
    body: "I built a video-rendering pipeline that runs in production for a client, and I ship an open-source version of the same idea, Catalogue Orchestrator, on my own time. Batch media processing at volume is not an abstraction to me.",
  },
  {
    tone: "gray",
    title: "Support experience with creative professionals.",
    body: "I've supported creative professionals on a cloud video editor at Wochit since 2021. Speed and reliability matter most to people working under a deadline.",
  },
];

// Work grid: live, public, clickable, AI/systems first then craft demos. The
// two that rhyme with Imagen's product (video pipeline, style-learning agent)
// lead. Joomsy stays a named credential in copy, never a linked card.
const WORK = [
  {
    tag: "AI video pipeline",
    title: "Catalogue Orchestrator",
    body: "Point it at a catalogue of footage plus an intent: it indexes clips with RAG, an AI agent plans the edit, and a deterministic ffmpeg compiler renders the cut. The AI only ever outputs an edit list, never raw ffmpeg, so results stay reproducible.",
    href: "https://barmoshe.github.io/catalogue-orchestrator/",
    cta: "Presentation",
  },
  {
    tag: "AI that learns your style",
    title: "MIDI Agent",
    body: "Answers a musician's MIDI phrase with editable, in-key MIDI inside their DAW. The same promise Imagen makes photographers: automate the tedium, keep the personal style.",
    href: "https://barmoshe.github.io/midi-agent/",
    cta: "Preview",
  },
  {
    tag: "Shipped on npm",
    title: "MDP",
    body: "A Markdown to document-and-deck compiler with an MCP server and editor plugins. A real developer tool people install, not a demo.",
    href: "https://barmoshe.github.io/mdp/",
    cta: "Docs",
  },
  {
    tag: "Distributed",
    title: "Temporal pipeline",
    body: "One Temporal workflow orchestrating Go, Python and TypeScript workers, with retries and validation. Featured on Temporal's Code Exchange.",
    href: "https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal",
    cta: "Code Exchange",
  },
  {
    tag: "Creative tools",
    title: "Biome Synth",
    body: "A browser instrument with an AI DJ across five living biomes. Tone.js, Three.js and Canvas2D, playable right now.",
    href: "https://biome-synth.lovable.app/",
    cta: "Play it",
  },
  {
    tag: "On-device vision",
    title: "Bloom Garden",
    body: "Webcam hand-tracking game: pinch to pluck flowers. MediaPipe runs fully in the browser, no video ever leaves the device.",
    href: "https://bloom-garden-five.vercel.app",
    cta: "Play it",
  },
  {
    tag: "Full-stack",
    title: "Israelify",
    body: "A Spotify-style app built end to end: React over a Node and Mongo API with auth, middleware and a custom logger.",
    href: "https://github.com/barmoshe/Israelify-backend",
    cta: "GitHub",
  },
];

// FAQ accordion, mirroring Imagen's layout, plain CV-register answers.
const FAQ = [
  {
    q: "Has he actually used Electron?",
    a: "Yes, in client work I can describe but not link, since the code is the client's. Main and renderer processes, IPC, packaging, and the occasional native-module fight. Under Electron it's Chromium plus Node, the stack I write daily anyway.",
  },
  {
    q: "Why Imagen?",
    a: "I build creative tools on my own time, instruments and MIDI agents, so I already work on automating a tedious task while protecting someone's personal style. Supporting a cloud video editor at Wochit taught me who this kind of software serves: professionals working under a deadline.",
  },
  {
    q: "Does he fit the experience band?",
    a: "Judge the shipped work: primary developer at an early-stage startup, a production video pipeline for a freelance client, open-source on npm, a B.Sc. in Computer Science. Everything on this page is real and most of it is clickable.",
  },
  {
    q: "Can he start something real in week one?",
    a: "This page: from the job posting to a deployed site, in Imagen's brand, with a matching CV, inside a day. That's my normal pace, with lint gates and accessibility checks included, not skipped.",
  },
];

// Seamless loop: exactly two identical copies; the inter-copy seam is baked in
// as padding so translateX(-50%) lands pixel-perfect. Decorative (aria-hidden),
// with a static visually-hidden line carrying the content for assistive tech.
function Marquee({
  items,
  label,
  big = false,
}: {
  items: string[];
  label: string;
  big?: boolean;
}) {
  return (
    <div className={big ? "imagen-marquee imagen-marquee-big" : "imagen-marquee"}>
      <p className="imagen-visually-hidden">
        {label}: {items.join(", ")}.
      </p>
      <div className="imagen-marquee-viewport" aria-hidden="true">
        <div className="imagen-marquee-track">
          {[0, 1].map((copy) => (
            <div className="imagen-marquee-copy" key={copy}>
              {items.map((item) => (
                <span className="imagen-marquee-item" key={item}>
                  {item}
                  <span className="imagen-marquee-dot">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (i: number) => {
    const n = (i + TABS.length) % TABS.length;
    setActive(n);
    tabRefs.current[n]?.focus();
  };

  return (
    <div className="imagen-tabs">
      <div
        className="imagen-tablist"
        role="tablist"
        aria-label="Where I work in the stack"
      >
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            className="imagen-tab"
            type="button"
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                move(i + 1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                move(i - 1);
              } else if (e.key === "Home") {
                e.preventDefault();
                move(0);
              } else if (e.key === "End") {
                e.preventDefault();
                move(TABS.length - 1);
              }
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          tabIndex={0}
          hidden={i !== active}
          className="imagen-tabpanel"
        >
          <p>{t.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ImagenApp() {
  useReveal();

  const waHref = buildWhatsAppHref(
    "Hi Bar, saw your page built for Imagen, let's talk.",
  );
  const mailHref = buildMailtoHref("Bar Moshe, for Imagen");

  return (
    <div className="imagen-root">
      <a className="imagen-skip" href="#main">
        Skip to content
      </a>

      <header className="imagen-header">
        <div className="imagen-wrap">
          <nav className="imagen-nav" aria-label="Primary">
            <span className="imagen-wordmark">bar for imagen</span>
            <div className="imagen-nav-links">
              <a className="imagen-nav-link" href="#work">
                The work
              </a>
              <a className="imagen-btn" href={mailHref}>
                Get in touch
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* --- hero: centered, giant serif, chips, coral CTA (their hero) --- */}
        <section className="imagen-hero" data-reveal>
          <div className="imagen-wrap">
            <p className="imagen-proofstrip">
              <span className="imagen-star" aria-hidden="true">
                ★
              </span>
              The projects below are live and public
            </p>
            <h1>Full-stack engineer, TypeScript and React.</h1>
            <div className="imagen-compat">
              <span className="imagen-compat-label">Compatible with</span>
              <span className="imagen-chip">TS</span>
              <span className="imagen-chip">React</span>
              <span className="imagen-chip">Node</span>
              <span className="imagen-chip">Electron</span>
            </div>
            <p className="imagen-sub">
              I&apos;m Bar Moshe. I build product features end to end in
              TypeScript, across web and desktop, and I&apos;m applying for
              Imagen&apos;s Full Stack Engineer role.
            </p>
            <div className="imagen-cta-row imagen-cta-center">
              <a className="imagen-btn imagen-btn-lg" href="#work">
                See the work
              </a>
              <a className="imagen-btn-ghost" href={CV_HREF}>
                Download CV
              </a>
            </div>
            <div className="imagen-centerpiece">
              <Centerpiece />
            </div>
          </div>
        </section>

        {/* --- shipped marquee (their photographer-name marquee) --- */}
        <section className="imagen-marquee-strip">
          <p className="imagen-eyebrow imagen-eyebrow-center">
            Shipped work
          </p>
          <Marquee items={SHIPPED} label="Shipped work" />
        </section>

        {/* --- tabs (their "One platform, fully equipped.") --- */}
        <section
          className="imagen-wrap imagen-section"
          data-reveal
          aria-labelledby="range-h"
        >
          <p className="imagen-eyebrow imagen-eyebrow-center">
            Full-stack range
          </p>
          <h2 className="imagen-h2 imagen-h2-center" id="range-h">
            Where I work in the stack.
          </h2>
          <p className="imagen-section-sub">
            Six parts of the stack I work in, mapped to Imagen&apos;s stack.
          </p>
          <Tabs />
        </section>

        {/* --- tint fit cards (their "Built around you") --- */}
        <section
          className="imagen-wrap imagen-section"
          data-reveal
          aria-labelledby="fit-h"
        >
          <p className="imagen-eyebrow imagen-eyebrow-center">
            Mapped to your posting
          </p>
          <h2 className="imagen-h2 imagen-h2-center" id="fit-h">
            How I match the role.
          </h2>
          <div className="imagen-fit-grid">
            {FIT_CARDS.map((c) => (
              <article
                className={`imagen-fit-card imagen-tone-${c.tone}`}
                key={c.title}
              >
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --- dark stack band (their "YOUR STORY. YOUR GENRE." marquee) --- */}
        <section className="imagen-dark" aria-labelledby="stack-h">
          <p className="imagen-eyebrow imagen-eyebrow-dark" id="stack-h">
            The stack I use daily.
          </p>
          <Marquee items={STACK_WORDS} label="Working stack" big />
        </section>

        {/* --- work grid --- */}
        <section
          className="imagen-wrap imagen-section"
          data-reveal
          aria-labelledby="work-h"
          id="work"
        >
          <p className="imagen-eyebrow imagen-eyebrow-center">
            Selected work
          </p>
          <h2 className="imagen-h2 imagen-h2-center" id="work-h">
            The work, live.
          </h2>
          <p className="imagen-section-sub">
            Public, live projects. Closest to this role first.
          </p>
          <div className="imagen-work-grid">
            {WORK.map((w) => (
              <a className="imagen-work-card" key={w.title} href={w.href}>
                <span className="imagen-work-tag">{w.tag}</span>
                <span className="imagen-work-title">{w.title}</span>
                <span className="imagen-work-body">{w.body}</span>
                <span className="imagen-work-cta">
                  {w.cta} <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
          <p className="imagen-work-note">
            Day job: primary developer at Joomsy, an early-stage startup, across
            the full stack and the DevOps behind it. That code is theirs, so it
            stays unlinked.
          </p>
        </section>

        {/* --- FAQ (their "You're probably wondering...") --- */}
        <section
          className="imagen-wrap imagen-section imagen-faq-section"
          data-reveal
          aria-labelledby="faq-h"
        >
          <h2 className="imagen-h2 imagen-h2-center" id="faq-h">
            Questions you might have.
          </h2>
          <div className="imagen-faq">
            {FAQ.map((f) => (
              <details className="imagen-faq-item" key={f.q}>
                <summary>
                  {f.q}
                  <span className="imagen-faq-mark" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* --- close (their "Be present for the work you care about.") --- */}
        <section className="imagen-close" data-reveal aria-labelledby="close-h">
          <div className="imagen-wrap">
            <h2 className="imagen-h2 imagen-close-h" id="close-h">
              Let&apos;s talk.
            </h2>
            <p className="imagen-close-sub">
              I like what Imagen builds: automating tedious editing work so
              photographers can focus on the part they love. Tel Aviv based,
              hybrid ready.
            </p>
            <div className="imagen-cta-row imagen-cta-center">
              <a className="imagen-btn imagen-btn-lg" href={waHref}>
                WhatsApp
              </a>
              <a className="imagen-btn-ghost" href={mailHref}>
                Email
              </a>
              <a className="imagen-btn-ghost" href={CV_HREF}>
                Download CV
              </a>
            </div>
            <p className="imagen-micro">
              GitHub:{" "}
              <a href={GITHUB} className="imagen-inline-link">
                barmoshe
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="imagen-foot">
        <div className="imagen-wrap">
          <p>
            Built by Bar Moshe as an application for Imagen&apos;s Full Stack
            Engineer role. Not affiliated with or endorsed by Imagen.
          </p>
          <p className="imagen-foot-note">
            Type set in Fraunces and Hanken Grotesk as free stand-ins for
            Imagen&apos;s Prody and Graphik.
          </p>
        </div>
      </footer>
    </div>
  );
}
