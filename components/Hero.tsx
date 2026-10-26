import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { heroImage, homeCapabilities } from "@/lib/site-data";
import { business } from "@/lib/business";
import { CategoryGrid } from "./CategoryGrid";
import { SiteImage } from "./SiteImage";

export function Hero() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <SiteImage src={heroImage} alt="Harvested timber and forestry equipment at the logging yard" priority sizes="100vw" quality={65} cover />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Lumber, materials &amp; site services</p>
          <h1 id="hero-title">{business.name}</h1>
          <p className="hero-alias">&quot;{business.alternateName}&quot;</p>
          <p className="hero-line">From forest to finished timber.</p>
          <p className="hero-copy">Lumber, mouldings, sawmill services and haulage for projects across Trinidad &amp; Tobago.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/quote">Request a Quote <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link className="btn btn-secondary" href="/lumber">Explore Lumber</Link>
          </div>
        </div>
        <div className="hero-caption"><span>Trinidad &amp; Tobago</span><span>Supply. Process. Deliver.</span></div>
      </section>
      <section className="section capabilities-section" id="capabilities" aria-labelledby="capability-title">
        <div className="section-head">
          <p className="eyebrow">What we do</p>
          <h2 id="capability-title">Materials and services.<br />One connected operation.</h2>
          <p>Find the supplies and practical support your project needs.</p>
        </div>
        <CategoryGrid items={homeCapabilities} />
      </section>
    </>
  );
}
