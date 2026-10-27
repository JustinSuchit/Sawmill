import { pageMetadata } from "@/lib/metadata";
import { ManagedCatalog } from "@/components/ManagedCatalog";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteImage } from "@/components/SiteImage";
import { toolImage } from "@/lib/site-data";

export const metadata = pageMetadata("Tools & Hardware", "Tools, sawmill supplies and hardware for contractors and tradespeople in Trinidad & Tobago.", "/products");

export default function ProductsPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Tools & Hardware"
        title="Tools Built for the Job."
        copy="Reliable tools and hardware for contractors, tradesmen, maintenance teams and everyday projects."
        image={toolImage}
      />
      <section className="section tools-catalogue-section">
        <SectionHeading
          eyebrow="Tools"
          title="Tool Categories"
          copy="Browse blades, sharpening supplies, welding electrodes and nailers. Ask our team about the right fit for your work."
        />
        <ManagedCatalog page="products" />
      </section>
      <section className="section materials-bridge" aria-labelledby="tools-cross-title">
        <div className="materials-bridge-shell">
          <div className="materials-bridge-copy reveal">
            <p className="eyebrow">Materials</p>
            <h2 id="tools-cross-title">Complete the Build.</h2>
            <p>
              Pair the right tools with the lumber and concrete sleepers your project needs,
              then send us the details for a tailored quote.
            </p>
          </div>
          <nav className="materials-bridge-links reveal" aria-label="Material pages">
            <a className="materials-bridge-link" href="/lumber">
              <span>01</span>
              <strong>Explore Lumber</strong>
              <small>Processed timber and construction materials.</small>
            </a>
            <a className="materials-bridge-link" href="/steel">
              <span>02</span>
              <strong>Concrete Sleepers</strong>
              <small>Concrete sleepers and industrial products.</small>
            </a>
          </nav>
          <div className="materials-bridge-media reveal">
            <SiteImage
              src="/images/lumber/products/stacked-processed-lumber.jpg"
              alt="Stacks of processed lumber ready for project use"
              sizes="(max-width: 860px) 100vw, 32vw"
              cover
            />
          </div>
        </div>
      </section>
    </main>
  );
}
