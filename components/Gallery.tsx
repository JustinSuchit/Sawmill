"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { galleryItems } from "@/lib/site-data";

const filters = [
  ["all", "All"],
  ["lumber", "Lumber & Sawmill"],
  ["materials", "Construction Materials"],
  ["haulage", "Haulage"],
  ["tree", "Tree Services"],
  ["clearing", "Land Clearing"]
] as const;

type LightboxItem = {
  src: string;
  alt: string;
  title: string;
} | null;

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState<LightboxItem>(null);

  const visibleItems = galleryItems.filter((item) => activeFilter === "all" || item.category === activeFilter);

  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  return (
    <>
      <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
        <div className="section-head reveal">
          <p className="eyebrow">Projects / Gallery</p>
          <h2 id="gallery-title">Work Categories Ready for Real Project Photos.</h2>
          <p>Because no company-owned project images were provided, this gallery uses clearly marked placeholders.</p>
        </div>
        <div className="filter-bar" role="list" aria-label="Gallery filters">
          {filters.map(([value, label]) => (
            <button
              className={activeFilter === value ? "active" : undefined}
              key={value}
              type="button"
              onClick={() => setActiveFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {visibleItems.map((item) => (
            <button
              className={`gallery-item${item.className ? ` ${item.className}` : ""}`}
              key={item.title}
              type="button"
              onClick={() => setLightbox({ src: item.src, alt: item.alt, title: item.title })}
            >
              <Image src={item.src} alt={item.alt} width={1000} height={700} sizes="(max-width: 860px) 100vw, 25vw" unoptimized />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="lightbox" hidden={!lightbox} onClick={() => setLightbox(null)}>
        <button type="button" aria-label="Close gallery image" onClick={() => setLightbox(null)}>×</button>
        {lightbox && (
          <>
            <Image src={lightbox.src} alt={lightbox.alt} width={1200} height={800} sizes="100vw" unoptimized />
            <p>{lightbox.title}</p>
          </>
        )}
      </div>
    </>
  );
}
