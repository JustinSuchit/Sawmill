import Link from "next/link";

import { SiteImage } from "./SiteImage";

const serviceMedia = {
  deliveryFleet: {
    src: "/images/lumber/delivery/lumber-delivery-fleet.jpg",
    alt: "Loaded lumber delivery trucks",
  },
  forestClearing: {
    src: "/images/lumber/logging/forest-clearing-log-loading.jpg",
    alt: "Log loading during forest clearing operation",
  },
  sawmillPoster: {
    src: "/images/lumber/sawmill/sawmill-woodmizer.jpg",
    alt: "Wood-Mizer sawmill processing timber",
  },
};

export function ServiceMediaSections() {
  return (
    <>
      <section className="section service-proof" aria-labelledby="haulage-proof-title">
        <div className="service-proof-shell">
          <div className="service-proof-copy reveal">
            <p className="eyebrow">Haulage & Delivery Capability</p>
            <h2 id="haulage-proof-title">Materials Moved From Yard to Site.</h2>
            <p>
              Our delivery fleet supports the movement of lumber and materials
              from yard to project site.
            </p>
            <Link className="btn btn-dark" href="/quote">
              Request Haulage Quote
            </Link>
          </div>
          <div className="service-proof-media reveal">
            <SiteImage
              src={serviceMedia.deliveryFleet.src}
              alt={serviceMedia.deliveryFleet.alt}
              sizes="(max-width: 860px) 100vw, 54vw"
              cover
            />
          </div>
        </div>
      </section>

      <section className="section logging-proof" aria-labelledby="logging-proof-title">
        <div className="service-proof-shell service-proof-reverse">
          <div className="service-proof-media reveal">
            <SiteImage
              src={serviceMedia.forestClearing.src}
              alt={serviceMedia.forestClearing.alt}
              sizes="(max-width: 860px) 100vw, 54vw"
              cover
            />
          </div>
          <div className="service-proof-copy reveal">
            <p className="eyebrow">Logging & Site Operations</p>
            <h2 id="logging-proof-title">Field Work Backed by Equipment.</h2>
            <p>
              Timber extraction, site clearing and log handling are supported by
              heavy equipment and field operations.
            </p>
            <Link className="btn btn-primary" href="/quote">
              Request Service Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section sawmill-video-section" aria-labelledby="sawmill-video-title">
        <div className="video-proof-shell">
          <div className="video-proof-copy reveal">
            <p className="eyebrow">Sawmill Operation</p>
            <h2 id="sawmill-video-title">Straight-Cut Sawmill Processing.</h2>
            <p>
              See timber being processed through our sawmill operation for clean,
              consistent cuts.
            </p>
          </div>
          <div className="video-frame reveal">
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster={serviceMedia.sawmillPoster.src}
            >
              <source
                src="/videos/lumber/straight-log-sawmill-cut.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>
    </>
  );
}
