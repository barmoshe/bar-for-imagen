// Bar's own contact channels, not company-specific, so these stay fixed across
// every bar-for-* site. The CTAs deep-link to WhatsApp and a prefilled mailto.
// Outreach for an application site is sent as Bar personally (this address), per
// references/bar-for-site.md, not the projects/billing address.
const EMAIL = "1barmoshe1@gmail.com";
const PHONE = "+972546561465"; // wa.me wants the international number, no "+".

export const contactEmail = EMAIL;

export const buildMailtoHref = (subject: string, body = "") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const buildWhatsAppHref = (text: string) =>
  `https://wa.me/${PHONE.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;
