import { sawmillImages } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

export function Sawmill() {
  return (
    <section className="sawmill band-dark" id="sawmill" aria-labelledby="sawmill-title">
      <div className="split">
        <div className="split-copy reveal">
          <p className="eyebrow">Sawmill Operation</p>
          <h2 id="sawmill-title">From Timber to Finished Lumber.</h2>
          <p>
            Sawmill capabilities help convert timber into usable lumber and custom-cut material for construction,
            repairs, site work and special orders. Replace the representative imagery here with company-owned sawmill photos when available.
          </p>
          <a className="btn btn-primary" href="#quote">Ask About Custom Cutting</a>
        </div>
        <div className="image-stack reveal" aria-label="Representative sawmill imagery">
          {sawmillImages.map((image) => (
            <SiteImage key={image.src} src={image.src} alt={image.alt} sizes="(max-width: 860px) 100vw, 40vw" />
          ))}
        </div>
      </div>
    </section>
  );
}
