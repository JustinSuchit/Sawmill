"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, LoaderCircle, Maximize2, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { SiteImage } from "./SiteImage";

type Photo = { src: string; alt: string; caption?: string; position?: string };
type PhotoGalleryProps = { images: Photo[]; className?: string; sizes: string; priority?: boolean };

export function PhotoGallery({ images, className = "", sizes, priority = false }: PhotoGalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [active, setActive] = useState<number | null>(null);
  const [imageState, setImageState] = useState<"loading" | "ready" | "error">("loading");
  const current = images[active ?? 0];

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [active]);

  function move(direction: number) {
    if (images.length < 2) return;
    setImageState("loading");
    setActive((index) => ((index ?? 0) + direction + images.length) % images.length);
  }

  return (
    <>
      <div className={`photo-gallery ${className}`}>
        {images.map((photo, index) => (
          <figure key={photo.src}>
            <button className="photo-gallery-trigger" type="button" aria-label={`View photo: ${photo.alt}`} aria-haspopup="dialog" onClick={() => { setImageState("loading"); setActive(index); dialog.current?.showModal(); }}>
              <span className="photo-gallery-media">
                <SiteImage src={photo.src} alt={photo.alt} objectPosition={photo.position} sizes={sizes} quality={65} priority={priority && index === 0} cover />
              </span>
              <span className="photo-gallery-expand" aria-hidden="true"><Maximize2 size={18} /></span>
            </button>
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <dialog className="photo-dialog" ref={dialog} aria-labelledby={titleId} onClose={() => setActive(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      }}>
        <div className="photo-dialog-toolbar">
          <span>{active === null ? "" : `${active + 1} / ${images.length}`}</span>
          <div>
            <a href={current.src} target="_blank" rel="noopener noreferrer" aria-label="Open original photo" title="Open original photo"><ExternalLink size={20} /></a>
            <button type="button" aria-label="Close photo" title="Close photo" onClick={() => dialog.current?.close()}><X size={22} /></button>
          </div>
        </div>
        {active !== null && (
          <div className="photo-dialog-image">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="(max-width: 1100px) 95vw, 1100px" style={{ objectFit: "contain" }} loading="eager" onLoad={() => setImageState("ready")} onError={() => setImageState("error")} />
            {imageState === "loading" && <span className="photo-dialog-status" role="status"><LoaderCircle size={28} aria-hidden="true" /><span className="sr-only">Loading photo</span></span>}
            {imageState === "error" && <span className="photo-dialog-status" role="alert">Photo unavailable</span>}
            {images.length > 1 && <>
              <button className="photo-previous" type="button" aria-label="Previous photo" title="Previous photo" onClick={() => move(-1)}><ChevronLeft size={24} /></button>
              <button className="photo-next" type="button" aria-label="Next photo" title="Next photo" onClick={() => move(1)}><ChevronRight size={24} /></button>
            </>}
          </div>
        )}
        <p id={titleId} aria-live="polite">{current.caption || current.alt}</p>
      </dialog>
    </>
  );
}
