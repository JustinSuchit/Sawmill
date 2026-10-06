import Link from "next/link";

import { SiteImage } from "./SiteImage";

const sleeperImages = [
  {
    src: "/images/lumber/sleepers/concrete-sleeper-storage-yard.jpg",
    alt: "Concrete sleepers stored in industrial yard",
  },
  {
    src: "/images/lumber/sleepers/concrete-sleepers-laid-out-site.jpg",
    alt: "Concrete sleepers laid out at project site",
  },
  {
    src: "/images/lumber/sleepers/finished-concrete-sleeper-closeup.jpg",
    alt: "Finished concrete sleeper close-up",
  },
  {
    src: "/images/lumber/sleepers/concrete-sleeper-handling-equipment.jpg",
    alt: "Equipment handling concrete sleepers",
  },
  {
    src: "/images/lumber/sleepers/concrete-sleeper-installation-layout.jpg",
    alt: "Concrete sleepers arranged for installation",
  },
];

export function SleeperFeature() {
  return (
    <section className="section sleeper-feature" aria-labelledby="sleeper-feature-title">
      <div className="sleeper-shell">
        <div className="sleeper-copy reveal">
          <p className="eyebrow">Concrete Sleepers</p>
          <h2 id="sleeper-feature-title">Concrete Sleepers.</h2>
          <p>
            Heavy-duty concrete sleepers available for infrastructure and
            industrial applications, with sale and rental options handled by quote.
          </p>
          <Link className="btn btn-dark" href="/quote">
            Request Sleeper Quote
          </Link>
        </div>
        <div className="sleeper-gallery reveal">
          <div className="sleeper-primary">
            <SiteImage
              src={sleeperImages[0].src}
              alt={sleeperImages[0].alt}
              sizes="(max-width: 860px) 100vw, 54vw"
              cover
            />
          </div>
          {sleeperImages.slice(1).map((image) => (
            <div className="sleeper-support" key={image.src}>
              <SiteImage
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 860px) 50vw, 20vw"
                cover
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
