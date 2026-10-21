import Link from "next/link";
import type { CategoryCard as CategoryCardData } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

type CategoryCardProps = {
  item: CategoryCardData;
  variant?: "default" | "steel" | "tools";
  priority?: boolean;
};

export function CategoryCard({ item, variant = "default", priority = false }: CategoryCardProps) {
  return (
    <article className={`category-card ${variant === "steel" ? "steel-card" : ""} reveal`}>
      <div className="category-media">
        <SiteImage src={item.src} alt={item.alt} objectPosition={item.imagePosition} priority={priority} sizes={variant === "tools" ? "(max-width: 520px) 100vw, (max-width: 1120px) 50vw, 310px" : "(max-width: 520px) 100vw, (max-width: 1120px) 50vw, 414px"} cover />
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
        {item.specs && <p className="spec-placeholder">{item.specs}</p>}
        <Link className="text-link" href={item.href === "/quote" ? `/quote?product=${encodeURIComponent(item.title)}` : item.href}>{item.cta}</Link>
      </div>
    </article>
  );
}
