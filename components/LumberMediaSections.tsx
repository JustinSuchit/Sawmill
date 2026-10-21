import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SiteImage } from "./SiteImage";
import { PhotoGallery } from "./PhotoGallery";

const processedLumber = {
  src: "/images/lumber/export/export-lumber-bundles.jpg",
  alt: "Processed timber bundled and stacked in the workshop",
};

const palletImages = [
  {
    src: "/images/lumber/pallets/four-way-entry-timber-pallet-side-view.jpg",
    alt: "Side view of four-way entry timber pallet",
  },
  {
    src: "/images/lumber/pallets/pallet delivery.jpg",
    alt: "Timber pallets stacked on a delivery truck",
  },
];

const mouldingImages = [
  {
    src: "/images/lumber/products/timber-moulding-profile-sanding.jpg",
    alt: "Shaped timber moulding being sanded in the workshop",
    position: "50% 42%",
    caption: "Shaping and finishing in our workshop",
  },
  {
    src: "/images/lumber/products/shaped-timber-moulding-profiles.jpg",
    alt: "Timber moulding profiles showing their curved cross sections",
    position: "25% 38%",
    caption: "A closer look at the timber profiles",
  },
];

const exportImages = [
  {
    src: "/images/lumber/export/export-timber-container-load.jpg",
    alt: "Lumber prepared for export shipment to India",
    label: "India",
    category: "International Export",
  },
  {
    src: "/images/lumber/export/export-marked-timber-bundles.jpg",
    alt: "Timber bundles prepared for export to St. Vincent and the Grenadines",
    label: "St. Vincent & the Grenadines",
    category: "Regional Export",
  },
  {
    src: "/images/lumber/export/export-lumber-bundles.jpg",
    alt: "Processed lumber bundled for shipment to St. Vincent and the Grenadines",
    label: "St. Vincent & the Grenadines",
    category: "Regional Export",
  },
];

function ExportLabel({
  category,
  label,
}: {
  category: string;
  label: string;
}) {
  return (
    <div className="export-location-label" aria-hidden="true">
      <span>{category}</span>
      <strong>{label}</strong>
    </div>
  );
}

export function LumberMediaSections() {
  return (
    <>
      <section className="section product-feature lumber-page-feature" aria-labelledby="processed-lumber-title">
        <div className="product-feature-shell">
          <div className="product-feature-media reveal">
            <SiteImage
              src={processedLumber.src}
              alt={processedLumber.alt}
              sizes="(max-width: 860px) 100vw, 56vw"
              cover
            />
          </div>
          <div className="product-feature-copy reveal">
            <p className="eyebrow">Processed Lumber</p>
            <h2 id="processed-lumber-title">Prepared for Construction and Woodworking.</h2>
            <p>
              Processed timber supports dimensional lumber, construction lumber,
              furniture work and custom-cut project requirements.
            </p>
            <Link className="btn btn-dark" href="/quote?product=Dimensional%20Lumber">
              Request Lumber Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section mouldings-showcase" aria-labelledby="mouldings-title">
        <div className="mouldings-shell">
          <div className="mouldings-heading reveal">
            <div>
              <p className="eyebrow">Mouldings &amp; Dressed Lumber</p>
              <h2 id="mouldings-title">Timber Mouldings for the Finishing Details.</h2>
              <p>
                We shape and dress timber for crown mouldings, base mouldings
                and custom profiles to suit your project.
              </p>
            </div>
            <Link className="btn btn-primary" href="/quote?product=Mouldings%20%26%20Dressed%20Lumber">
              Request Moulding Quote <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <PhotoGallery images={mouldingImages} className="mouldings-gallery" sizes="(max-width: 680px) 100vw, (max-width: 1240px) 50vw, 620px" />
          <div className="mouldings-details">
            <ul aria-label="Mouldings and dressed lumber options">
              {["Lumber dressing", "Crown mouldings", "Base mouldings", "Premium decking", "Flooring", "Custom designs"].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>Dressing starts at $1.50 per square foot.</p>
          </div>
        </div>
      </section>

      <section className="section media-duo-section" aria-labelledby="pallets-title">
        <div className="media-duo-shell">
          <div className="media-duo-copy reveal">
            <p className="eyebrow">Pallets</p>
            <h2 id="pallets-title">Four-Way Entry Timber Pallets.</h2>
            <p>
              Durable timber pallets designed for convenient handling and access
              from multiple sides.
            </p>
            <Link className="btn btn-dark" href="/quote?product=Timber%20Pallets">
              Request Pallet Quote
            </Link>
          </div>
          <div className="media-duo-grid reveal">
            {palletImages.map((image) => (
              <SiteImage
                key={image.src}
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 28vw"
                cover
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section export-feature" aria-labelledby="export-title">
        <div className="section-head reveal">
          <p className="eyebrow">Export Capability</p>
          <h2 id="export-title">Timber Prepared for Export.</h2>
          <p>
            From the Caribbean to international markets, our timber has been
            prepared and supplied for export to destinations including India and
            St. Vincent and the Grenadines.
          </p>
          <div className="export-reach" aria-label="Export reach">
            <span>Export Reach</span>
            <strong>India</strong>
            <strong>St. Vincent & the Grenadines</strong>
          </div>
        </div>
        <div className="editorial-gallery export-gallery">
          <div className="editorial-gallery-main reveal">
            <div className="export-image-card">
              <SiteImage
                src={exportImages[0].src}
                alt={exportImages[0].alt}
                sizes="(max-width: 860px) 100vw, 52vw"
                cover
              />
              <ExportLabel
                category={exportImages[0].category}
                label={exportImages[0].label}
              />
            </div>
          </div>
          <div className="editorial-gallery-stack reveal">
            {exportImages.slice(1).map((image) => (
              <div className="export-image-card" key={image.src}>
                <SiteImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 860px) 100vw, 26vw"
                  cover
                />
                <ExportLabel category={image.category} label={image.label} />
              </div>
            ))}
          </div>
        </div>
        <div className="export-capability-note reveal">
          <h3>Regional and international export capability.</h3>
          <p>
            Timber can be processed, bundled and prepared for commercial
            shipment based on customer and destination requirements.
          </p>
        </div>
      </section>
    </>
  );
}
