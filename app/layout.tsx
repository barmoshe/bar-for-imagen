import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "@/src/marketing/imagen/marketing-base.css";
import "@/src/marketing/imagen/imagen.css";

// Imagen sets display type in "Prody" (licensed editorial serif) with "Graphik"
// as the body grotesque. Closest free stand-ins, read against the live site:
// Fraunces (high-contrast soft serif) + Hanken Grotesk (neutral warm grotesque).
const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--imagen-font-display",
  axes: ["opsz"],
  display: "swap",
});

const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--imagen-font",
  display: "swap",
});

export const metadata: Metadata = {
  // Canonical deploy origin (resolves OG/twitter image URLs). Reslugs with the site.
  metadataBase: new URL("https://bar-for-imagen.vercel.app"),
  title: "Bar Moshe, for Imagen · Full Stack Engineer",
  description:
    "A full-stack engineer, powered by builder DNA. One page in Imagen's own visual language: TypeScript, React, Node, Electron, and shipped work with live links.",
  // Private application page, never index it.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <body>
        {/* Visit beacon: reports one hit per session to the bar-for-companies
            gallery. data-bar-for-id is re-slugged by new-bar-for.mjs. */}
        <Script
          src="https://bar-for-companies.vercel.app/track.js"
          data-bar-for-id="imagen"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
