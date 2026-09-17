import type { CSSProperties } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  tone?: "default" | "steel" | "timber";
};

export function PageHeader({ eyebrow, title, copy, image, tone = "default" }: PageHeaderProps) {
  return (
    <section
      className={`page-hero page-hero-${tone}`}
      aria-labelledby="page-title"
      style={image ? { "--page-hero-image": `url("${image}")` } as CSSProperties : undefined}
    >
      <div className="page-hero-content reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
