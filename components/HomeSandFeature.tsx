import { getPageProducts } from "@/lib/catalog";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { quarryImages } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

export async function HomeSandFeature() {
  const service = (await getPageProducts("services")).find(item => item.id === "white-plastering-sand");
  if (!service) return null;
  return (
    <section className="section home-sand-feature" aria-labelledby="home-sand-title">
      <div className="service-proof-shell">
        <div className="service-proof-copy">
          <p className="eyebrow">Materials for your project</p>
          <h2 id="home-sand-title">{service.title}.<br />Supply for your project.</h2>
          <p>{service.description}</p>
          <Link className="btn btn-primary" href="/services#white-plastering-sand">Explore Sand Supply <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="service-proof-media">
          <SiteImage {...quarryImages[2]} sizes="(max-width: 860px) 100vw, 54vw" objectPosition="50% 40%" cover />
        </div>
      </div>
    </section>
  );
}
