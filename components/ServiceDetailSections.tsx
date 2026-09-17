import Link from "next/link";
import { serviceDetails } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

const process = [
  ["01", "Site Assessment"],
  ["02", "Planning & Preparation"],
  ["03", "Tree Cutting & Removal"],
  ["04", "Cleanup & Hauling"]
] as const;

const serviceIds: Record<string, string> = {
  "Haulage & Delivery": "haulage",
  "Tree Removal": "tree-removal",
  "Sawmill Services": "sawmill-services"
};

export function ServiceDetailSections() {
  return (
    <>
      {serviceDetails.map((service, index) => (
        <section
          className={`service-feature ${index % 2 === 1 ? "service-feature-flip" : ""}`}
          id={serviceIds[service.eyebrow]}
          key={service.eyebrow}
        >
          <div className="service-feature-media reveal">
            <SiteImage src={service.src} alt={service.alt} sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
          <div className="service-feature-copy reveal">
            <p className="eyebrow">{service.eyebrow}</p>
            <h2>{service.eyebrow.toUpperCase()}</h2>
            <p>{service.description}</p>
            <div className="check-list" aria-label={`${service.eyebrow} capabilities`}>
              {service.items.map((item) => <span key={item}>{item}</span>)}
            </div>
            {service.eyebrow === "Tree Removal" && (
              <ol className="process-mini tree-process">
                {process.map(([number, title]) => (
                  <li key={number}><strong>{number}</strong> {title}</li>
                ))}
              </ol>
            )}
            <div className="hero-actions">
              <Link className="btn btn-primary" href={service.href}>{service.cta}</Link>
              {service.eyebrow === "Tree Removal" && <Link className="btn btn-secondary" href="/services#haulage">Need Material Hauled Away?</Link>}
              {service.eyebrow === "Sawmill Services" && <Link className="btn btn-secondary" href="/lumber">Need Lumber?</Link>}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
