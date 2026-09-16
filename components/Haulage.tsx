import { heroImage } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

export function Haulage() {
  return (
    <section className="section haulage" id="haulage" aria-labelledby="haulage-title">
      <div className="section-head reveal">
        <p className="eyebrow">Haulage</p>
        <h2 id="haulage-title">We Move What You Need, Where You Need It.</h2>
        <p>
          Transportation support for lumber, steel, construction materials, timber, equipment and commercial deliveries.
          Truck types and capacities are intentionally left unspecified until verified company data is supplied.
        </p>
      </div>
      <div className="haulage-strip reveal">
        <SiteImage src={heroImage} alt="Representative flatbed haulage for timber materials" sizes="(max-width: 860px) 100vw, 55vw" />
        <div>
          <h3>Built for supply jobs and site logistics.</h3>
          <p>Coordinate material movement with the same team handling supply, cutting or clearing.</p>
          <a className="btn btn-dark" href="#quote">Request Haulage Quote</a>
        </div>
      </div>
    </section>
  );
}
