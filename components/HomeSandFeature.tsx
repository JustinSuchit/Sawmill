import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { quarryImages } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

export function HomeSandFeature() {
  return (
    <section className="section home-sand-feature" aria-labelledby="home-sand-title">
      <div className="service-proof-shell">
        <div className="service-proof-copy">
          <p className="eyebrow">Materials for your project</p>
          <h2 id="home-sand-title">White plastering sand.<br />Now part of our supply.</h2>
          <p>Alongside our timber and site services, we supply white plastering sand for plastering work. Ask about pricing and availability for the quantity you need.</p>
          <Link className="btn btn-primary" href="/services#white-plastering-sand">Explore Sand Supply <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="service-proof-media">
          <SiteImage {...quarryImages[2]} sizes="(max-width: 860px) 100vw, 54vw" objectPosition="50% 40%" cover />
        </div>
      </div>
    </section>
  );
}
