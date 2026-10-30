import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog-types";
import { quarryImages } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

export function ServiceFeature({ service, index = 0, haulageVisible = true }: { service: CatalogProduct; index?: number; haulageVisible?: boolean }) {
  return <section className={`service-feature ${index % 2 ? "service-feature-flip" : ""}`} id={service.id}>
    <div className="service-feature-media reveal"><SiteImage src={service.thumbnail_src || service.image_src} alt={service.image_alt} sizes="(max-width: 860px) 100vw, 50vw" quality={service.id === "white-plastering-sand" ? 65 : 75} objectPosition={service.image_position} cover /></div>
    <div className="service-feature-copy reveal">
      <p className="eyebrow">{service.label}</p><h2>{service.title}</h2><p>{service.description}</p>
      {service.examples.length > 0 && <div className="check-list" aria-label={`${service.title} capabilities`}>{service.examples.map((item, i) => <span key={`${i}:${item}`}>{item}</span>)}</div>}
      {service.price != null && <p className="category-specs"><strong>{new Intl.NumberFormat("en-TT", { style: "currency", currency: "TTD", currencyDisplay: "code" }).format(service.price)}</strong>{service.price_unit ? ` ${service.price_unit}` : ""}. VAT included.</p>}
      {service.specs && <p className="category-specs">{service.specs}</p>}
      {service.id === "white-plastering-sand" && <div className="quarry-gallery" aria-label="Sand quarry photos">{quarryImages.slice(1).map(photo => <div className="quarry-gallery-photo" key={photo.src}><SiteImage {...photo} sizes="(max-width: 860px) 45vw, 22vw" cover /></div>)}</div>}
      {service.id === "tree-removal" && <ol className="process-mini tree-process">{["Site Assessment", "Planning & Preparation", "Tree Cutting & Removal", "Cleanup & Hauling"].map((title,i) => <li key={title}><strong>{String(i+1).padStart(2,"0")}</strong> {title}</li>)}</ol>}
      <div className="hero-actions"><Link className="btn btn-primary" href={`/quote?product=${encodeURIComponent(service.title)}`}>Enquire About This Service</Link>
        {service.id === "tree-removal" && haulageVisible && <Link className="btn btn-secondary" href="/services#haulage">Need Material Hauled Away?</Link>}
        {service.id === "sawmill-services" && <Link className="btn btn-secondary" href="/lumber">Need Lumber?</Link>}
      </div>
    </div>
  </section>;
}
