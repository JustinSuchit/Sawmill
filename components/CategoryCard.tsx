import Link from "next/link";
import type { CategoryCard as CategoryCardData } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";
import { PhotoGallery } from "./PhotoGallery";

type CategoryCardProps = {
  item: CategoryCardData;
  variant?: "default" | "steel" | "tools";
  priority?: boolean;
};

export function CategoryCard({ item, variant = "default", priority = false }: CategoryCardProps) {
  const imageSizes = variant === "steel"
    ? "(max-width: 680px) calc(100vw - 34px), (max-width: 1288px) calc(50vw - 25px), 619px"
    : variant === "tools"
      ? "(max-width: 520px) calc(100vw - 34px), (max-width: 680px) calc(50vw - 26px), (max-width: 1120px) calc(50vw - 34px), (max-width: 1288px) calc(25vw - 26px), 296px"
      : "(max-width: 520px) calc(100vw - 34px), (max-width: 680px) calc(50vw - 26px), (max-width: 1120px) calc(50vw - 34px), (max-width: 1288px) calc(33.333vw - 29px), 401px";

  return (
    <article id={item.id} className={`category-card ${variant === "steel" ? "steel-card" : ""} reveal`}>
      <div className="category-media">
        <PhotoGallery images={[{ src: item.src, thumbnailSrc: item.thumbnailSrc, alt: item.alt, position: item.imagePosition }]} className="category-photo-gallery" sizes={imageSizes} priority={priority} />
      </div>
      <div className="category-body">
        <p className="label">{item.label}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.examples && (
          <ul className="compact-list" aria-label={`${item.title} examples`}>
            {item.examples.map((example) => <li key={example}>{example}</li>)}
          </ul>
        )}
        {item.specs && <p className="category-specs">{item.specs}</p>}
        <Link className="text-link" aria-label={`${item.cta}: ${item.title}`} href={item.href === "/quote" ? `/quote?product=${encodeURIComponent(item.title)}` : item.href}>{item.cta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
