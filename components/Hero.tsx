import { heroImage, homeCapabilities } from "@/lib/site-data";
import { CategoryGrid } from "./CategoryGrid";
import { SiteImage } from "./SiteImage";

export function Hero() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <picture>
          <SiteImage
            src={heroImage}
            alt="Logging yard with harvested timber and forestry equipment"
            priority
            sizes="100vw"
            cover
          />
        </picture>
        <div className="hero-overlay"></div>
        <div className="hero-content reveal">
          <p className="eyebrow">Trinidad & Tobago materials and field services</p>
          <h1 id="hero-title">From Forest to Finished Timber.</h1>
          <p className="hero-line">Quality lumber, sawmilling, haulage and timber services for residential, commercial and industrial needs.</p>
          <p className="hero-copy">
            Practical industrial supply and site services for contractors, maintenance teams, property owners and project work across Trinidad & Tobago.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/quote">Request a Quote</a>
            <a className="btn btn-secondary" href="/products">Explore Our Products</a>
          </div>
        </div>
      </section>

      <section className="capability-bar" id="capabilities" aria-label="Core capabilities">
        <a href="/products"><span>✚</span>Tools</a>
        <a href="/lumber"><span>▰</span>Lumber</a>
        <a href="/steel"><span>▱</span>Steel</a>
        <a href="/services#haulage"><span>↗</span>Haulage</a>
        <a href="/services#tree-removal"><span>⌁</span>Tree Removal</a>
        <a href="/services#sawmill-services"><span>◆</span>Sawmill</a>
      </section>
      <section className="section" aria-labelledby="capability-title">
        <div className="section-head reveal">
          <p className="eyebrow">Capabilities</p>
          <h2 id="capability-title">Products and Services Under One Roof.</h2>
          <p>Tools, lumber and steel supply connected to haulage, tree removal and sawmill services.</p>
        </div>
        <CategoryGrid items={homeCapabilities} />
      </section>
    </>
  );
}
