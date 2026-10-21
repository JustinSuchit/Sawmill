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
    ? "(max-width: 680px) 100vw, (max-width: 1240px) 50vw, 620px"
    : variant === "tools"
      ? "(max-width: 520px) 100vw, (max-width: 1120px) 50vw, 310px"
      : "(max-width: 520px) 100vw, (max-width: 1120px) 50vw, 414px";

  return (
    <article id={item.id} className={`category-card ${variant === "steel" ? "steel-card" : ""} reveal`}>
      <div className="category-media">
        <PhotoGallery images={[{ src: item.src, alt: item.alt, position: item.imagePosition }]} className="category-photo-gallery" sizes={imageSizes} priority={priority} />
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
