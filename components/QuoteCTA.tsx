import Link from "next/link";

type QuoteCTAProps = {
  eyebrow?: string;
  title: string;
  copy: string;
  cta?: string;
  href?: string;
  secondaryCta?: string;
  secondaryHref?: string;
};

export function QuoteCTA({
  eyebrow = "Request a Quote",
  title,
  copy,
  cta = "Request a Quote",
  href = "/quote",
  secondaryCta,
  secondaryHref
}: QuoteCTAProps) {
  return (
    <section className="quote-cta reveal">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="quote-cta-actions">
        <Link className="btn btn-primary" href={href}>{cta}</Link>
        {secondaryCta && secondaryHref && <Link className="btn btn-secondary" href={secondaryHref}>{secondaryCta}</Link>}
      </div>
    </section>
  );
}
