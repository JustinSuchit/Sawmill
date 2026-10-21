"use client";

import { useEffect } from "react";

export function WhyCardMotion() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = document.querySelectorAll<HTMLElement>(".why-card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.entered = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return null;
}
