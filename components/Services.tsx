import { services } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="section-head reveal">
        <p className="eyebrow">Services</p>
        <h2 id="services-title">More Than Materials. We Move, Cut and Clear.</h2>
        <p>One company for supply, processing, delivery and practical site services.</p>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card reveal" key={service.title}>
            <SiteImage src={service.src} alt={service.alt} sizes="(max-width: 860px) 100vw, 33vw" />
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="/quote">Request a Quote</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
