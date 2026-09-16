import { heroImage } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

export function Hero() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <picture>
          <SiteImage
            src={heroImage}
            alt="Representative flatbed truck loaded with timber and construction materials"
            priority
            sizes="100vw"
          />
        </picture>
        <div className="hero-overlay"></div>
        <div className="hero-content reveal">
          <p className="eyebrow">Trinidad & Tobago materials and field services</p>
          <h1 id="hero-title">Built From the Ground Up.</h1>
          <p className="hero-line">Lumber. Steel. Tools. Haulage. Sawmill Services. Tree Removal.</p>
          <p className="hero-copy">
            Reliable materials, equipment support and site services for contractors, industry and property owners across Trinidad & Tobago.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#quote">Request a Quote</a>
            <a className="btn btn-secondary" href="#services">Explore Our Services</a>
          </div>
        </div>
        <a className="scroll-indicator" href="#capabilities" aria-label="Scroll to capabilities"><span></span></a>
      </section>

      <section className="capability-bar" id="capabilities" aria-label="Core capabilities">
        <a href="#products"><span>▰</span>Lumber</a>
        <a href="#sawmill"><span>◆</span>Sawmill</a>
        <a href="#products"><span>▱</span>Steel</a>
        <a href="#products"><span>✚</span>Tools</a>
        <a href="#haulage"><span>↗</span>Haulage</a>
        <a href="#tree-services"><span>⌁</span>Tree Services</a>
      </section>
    </>
  );
}
