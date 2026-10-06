import Link from "next/link";

import { SiteImage } from "./SiteImage";

const lumberMedia = {
  forestrySkidder: {
    src: "/images/lumber/logging/forestry-skidder.jpg",
    alt: "Forestry skidder used for timber extraction",
  },
  harvestedTimberYard: {
    src: "/images/lumber/logging/harvested-timber-yard.jpg",
    alt: "Harvested logs prepared in a timber yard",
  },
  lumberLoggingYard: {
    src: "/images/lumber/logging/lumber-logging-yard.jpg",
    alt: "Logs stored at a lumber logging yard",
  },
  logExtractionSkidder: {
    src: "/images/lumber/logging/log-extraction-skidder.jpg",
    alt: "Skidder transporting harvested logs through forest",
  },
  forestLogExtraction: {
    src: "/images/lumber/logging/forest-log-extraction.jpg",
    alt: "Large timber logs extracted from forest site",
  },
  forestClearingLogLoading: {
    src: "/images/lumber/logging/forest-clearing-log-loading.jpg",
    alt: "Log loading during forest clearing operation",
  },
  stackedHardwoodLumber: {
    src: "/images/lumber/products/stacked-hardwood-lumber.jpg",
    alt: "Stacks of locally processed hardwood lumber",
  },
  stackedProcessedLumber: {
    src: "/images/lumber/products/stacked-processed-lumber.jpg",
    alt: "Stacks of processed lumber",
  },
  sawmillWoodmizer: {
    src: "/images/lumber/sawmill/sawmill-woodmizer.jpg",
    alt: "Wood-Mizer sawmill processing timber",
  },
  lumberDeliveryFleet: {
    src: "/images/lumber/delivery/lumber-delivery-fleet.jpg",
    alt: "Loaded lumber delivery trucks",
  },
  lumberHaulageTruck: {
    src: "/images/lumber/delivery/lumber-haulage-truck.jpg",
    alt: "Flatbed truck carrying processed lumber",
  },
  lumberDeliveryTruck: {
    src: "/images/lumber/delivery/lumber-delivery-truck.jpg",
    alt: "Lumber loaded onto delivery truck",
  },
  lumberDryingYard: {
    src: "/images/lumber/products/lumber-drying-yard.jpg",
    alt: "Processed lumber arranged for storage and drying",
  },
  exportMarkedTimberBundles: {
    src: "/images/lumber/export/export-marked-timber-bundles.jpg",
    alt: "Marked timber bundles prepared for export",
  },
  concreteSleeperStorageYard: {
    src: "/images/lumber/sleepers/concrete-sleeper-storage-yard.jpg",
    alt: "Concrete sleepers stored in industrial yard",
  },
};

const processSteps = [
  {
    number: "01",
    title: "Harvest",
    description: "Responsibly sourced timber selected for processing.",
    image: lumberMedia.forestLogExtraction,
  },
  {
    number: "02",
    title: "Extract",
    description: "Heavy-duty equipment moves logs safely from site to yard.",
    image: lumberMedia.logExtractionSkidder,
  },
  {
    number: "03",
    title: "Mill",
    description:
      "Logs are processed into usable lumber with professional sawmilling equipment.",
    image: lumberMedia.sawmillWoodmizer,
  },
  {
    number: "04",
    title: "Prepare",
    description:
      "Timber is sorted, stacked and prepared to meet project requirements.",
    image: lumberMedia.stackedProcessedLumber,
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "Finished lumber can be transported directly to project or customer locations.",
    image: lumberMedia.lumberDeliveryFleet,
  },
];

const galleryItems = [
  lumberMedia.forestClearingLogLoading,
  lumberMedia.exportMarkedTimberBundles,
  lumberMedia.concreteSleeperStorageYard,
  lumberMedia.lumberDryingYard,
  lumberMedia.lumberHaulageTruck,
];

export function HomeLumberStory() {
  return (
    <>
      <section className="section video-proof" aria-labelledby="video-proof-title">
        <div className="video-proof-shell">
          <div className="video-proof-copy reveal">
            <p className="eyebrow">In the Yard</p>
            <h2 id="video-proof-title">Timber Prepared With Care.</h2>
            <p>
              From selection and measurement to processing and delivery, every
              stage is handled with attention to quality and consistency.
            </p>
          </div>
          <div className="video-frame reveal">
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster={lumberMedia.stackedProcessedLumber.src}
            >
              <source
                src="/videos/lumber/timber-measurement-video.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      <section className="section operation-process" aria-labelledby="operation-process-title">
        <div className="section-head reveal">
          <p className="eyebrow">From Forest to Finished Timber</p>
          <h2 id="operation-process-title">A Practical Timber Process.</h2>
          <p>
            Real company photography connects each stage of the operation, from
            forest extraction to processed lumber and delivery.
          </p>
        </div>
        <div className="process-card-grid">
          {processSteps.map((step) => (
            <article className="process-card reveal" key={step.number}>
              <div className="process-card-media">
                <SiteImage
                  src={step.image.src}
                  alt={step.image.alt}
                  sizes="(max-width: 860px) 100vw, 20vw"
                  cover
                />
              </div>
              <div className="process-card-body">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section product-feature" aria-labelledby="product-feature-title">
        <div className="product-feature-shell">
          <div className="product-feature-media reveal">
            <SiteImage
              src={lumberMedia.stackedProcessedLumber.src}
              alt={lumberMedia.stackedProcessedLumber.alt}
              sizes="(max-width: 860px) 100vw, 56vw"
              cover
            />
          </div>
          <div className="product-feature-copy reveal">
            <p className="eyebrow">Lumber Products</p>
            <h2 id="product-feature-title">Lumber for Every Project.</h2>
            <p>
              Locally processed timber available for construction, furniture,
              woodworking and industrial applications.
            </p>
            <ul className="feature-list">
              <li>Dimensional lumber</li>
              <li>Hardwood, softwood and semi-hardwood</li>
              <li>Dressed lumber and mouldings</li>
              <li>Custom-cut timber</li>
            </ul>
            <Link className="btn btn-dark" href="/lumber">
              Explore Lumber
            </Link>
          </div>
        </div>
      </section>

      <section className="section sawmill-feature" aria-labelledby="sawmill-feature-title">
        <div className="sawmill-feature-shell">
          <div className="sawmill-feature-copy reveal">
            <p className="eyebrow">Sawmill Services</p>
            <h2 id="sawmill-feature-title">Professional Sawmilling Services.</h2>
            <p>
              Timber processing, cutting to required sizes, bandsaw resharpening
              and blade setting services support customers who need practical
              sawmill capability.
            </p>
            <Link className="btn btn-primary" href="/services#sawmill-services">
              View Sawmill Services
            </Link>
          </div>
          <div className="sawmill-feature-media reveal">
            <SiteImage
              src={lumberMedia.sawmillWoodmizer.src}
              alt={lumberMedia.sawmillWoodmizer.alt}
              sizes="(max-width: 860px) 100vw, 50vw"
              cover
            />
          </div>
        </div>
      </section>

      <section className="section delivery-feature" aria-labelledby="delivery-feature-title">
        <div className="delivery-shell">
          <div className="delivery-media reveal">
            <SiteImage
              src={lumberMedia.lumberDeliveryFleet.src}
              alt={lumberMedia.lumberDeliveryFleet.alt}
              sizes="(max-width: 860px) 100vw, 52vw"
              cover
            />
            <div className="delivery-inset">
              <SiteImage
                src={lumberMedia.lumberHaulageTruck.src}
                alt={lumberMedia.lumberHaulageTruck.alt}
                sizes="(max-width: 860px) 45vw, 22vw"
                cover
              />
            </div>
          </div>
          <div className="delivery-copy reveal">
            <p className="eyebrow">Haulage & Delivery</p>
            <h2 id="delivery-feature-title">Lumber Delivered Where You Need It.</h2>
            <p>
              Reliable haulage and delivery services help move processed timber
              from our yard to your project location.
            </p>
            <Link className="btn btn-dark" href="/quote">
              Request Delivery Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section operations-feature" aria-labelledby="operations-feature-title">
        <div className="operations-shell">
          <div className="operations-copy reveal">
            <p className="eyebrow">Logging Operations</p>
            <h2 id="operations-feature-title">Built Around Real Operations.</h2>
            <p>
              From timber extraction to processing and transport, our operation
              supports the full journey from raw log to finished material.
            </p>
          </div>
          <div className="operations-editorial reveal">
            <SiteImage
              src={lumberMedia.forestrySkidder.src}
              alt={lumberMedia.forestrySkidder.alt}
              sizes="(max-width: 860px) 100vw, 42vw"
              cover
            />
            <SiteImage
              src={lumberMedia.forestClearingLogLoading.src}
              alt={lumberMedia.forestClearingLogLoading.alt}
              sizes="(max-width: 860px) 100vw, 24vw"
              cover
            />
            <SiteImage
              src={lumberMedia.lumberLoggingYard.src}
              alt={lumberMedia.lumberLoggingYard.alt}
              sizes="(max-width: 860px) 100vw, 24vw"
              cover
            />
          </div>
        </div>
      </section>

      <section className="section storage-callout" aria-labelledby="storage-callout-title">
        <div className="storage-shell reveal">
          <div>
            <p className="eyebrow">Preparation & Storage</p>
            <h2 id="storage-callout-title">Prepared and Stored for Use.</h2>
            <p>
              Processed lumber is arranged in the yard so material can be
              inspected, sorted and prepared for customer requirements.
            </p>
          </div>
          <SiteImage
            src={lumberMedia.lumberDryingYard.src}
            alt={lumberMedia.lumberDryingYard.alt}
            sizes="(max-width: 860px) 100vw, 48vw"
            cover
          />
        </div>
      </section>

      <section className="section operations-gallery" aria-labelledby="operations-gallery-title">
        <div className="section-head reveal">
          <p className="eyebrow">Inside Our Operations</p>
          <h2 id="operations-gallery-title">Logging, Milling and Delivery in View.</h2>
          <p>
            A look at logging, milling, timber preparation and delivery
            operations.
          </p>
        </div>
        <div className="operations-gallery-grid">
          {galleryItems.map((image) => (
            <div className="operations-gallery-item reveal" key={image.src}>
              <SiteImage
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 860px) 100vw, 25vw"
                cover
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
