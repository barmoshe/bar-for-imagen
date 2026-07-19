"use client";

import { useEffect } from "react";

// Scroll-reveal via a data-attribute PAIR, not a toggled className. (ADR 0187.)
//
// Why an attribute and not a class: components that mutate their own className
// (selectable cards, tab rows) get their class wiped by React's className diffing
// on re-render, snapping a revealed element back to hidden. An attribute set
// imperatively with setAttribute survives React re-render.
//
// Every element carrying `data-reveal` starts hidden (see marketing-base.css);
// it gets `data-in` stamped when it scrolls into view, once, then is unobserved.
// Reduced motion stamps `data-in` immediately so nothing is ever stuck hidden.
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reveal = (el: Element) => el.setAttribute("data-in", "");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.05 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
