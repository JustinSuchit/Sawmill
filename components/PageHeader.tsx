import { SiteImage } from "./SiteImage";
import { heroImage } from "@/lib/site-data";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  imagePosition?: string;
  tone?: "default" | "steel" | "timber";
};

export function PageHeader({ eyebrow, title, copy, image, imagePosition, tone = "default" }: PageHeaderProps) {
  return (
    <section
      className={`page-hero page-hero-${tone}`}
      aria-labelledby="page-title"
    >
      <SiteImage src={image || heroImage} alt="" objectPosition={imagePosition} sizes="100vw" priority cover />
      <div className="page-hero-content reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
