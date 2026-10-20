import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteImage } from "./SiteImage";

const featuredProducts = [
  { title: "Hardwood lumber", src: "/images/lumber/products/hardwood.webp", alt: "Stacked hardwood timber showing the end grain", href: "/lumber" },
  { title: "Mouldings & dressed lumber", src: "/images/lumber/products/timber-moulding-profile-sanding.jpg", alt: "Shaped timber moulding being sanded in the workshop", href: "/lumber#mouldings-title" },
  { title: "Concrete sleepers", src: "/images/lumber/sleepers/concrete-sleeper-storage-yard.jpg", alt: "Concrete sleepers stored at the yard", href: "/steel" },
];

export function HomeLumberStory() {
  return (
    <>
      <section className="section featured-products" aria-labelledby="featured-title">
        <div className="section-head">
          <p className="eyebrow">From our yard</p>
          <h2 id="featured-title">Ready for your next project.</h2>
          <p>Timber products, shaped profiles and industrial materials.</p>
        </div>
        <div className="featured-product-grid">
          {featuredProducts.map((product) => (
            <Link className="featured-product" href={product.href} key={product.title}>
              <div className="featured-product-media"><SiteImage src={product.src} alt={product.alt} sizes="(max-width: 680px) 100vw, 400px" cover /></div>
              <h3>{product.title}<ArrowUpRight size={20} aria-hidden="true" /></h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="section operations-overview" aria-labelledby="operations-title">
        <div className="operations-overview-shell">
          <div className="operations-overview-media">
            <SiteImage src="/images/lumber/sawmill/sawmill-woodmizer.jpg" alt="Wood-Mizer sawmill processing a timber log" sizes="(max-width: 860px) 100vw, 620px" cover />
          </div>
          <div>
            <p className="eyebrow">Behind the materials</p>
            <h2 id="operations-title">From the sawmill<br />to your site.</h2>
            <p>Timber processing, preparation and transportation connect the materials in our yard with the work at your site.</p>
            <ol className="operations-steps">
              <li><span>01</span><div><h3>Process</h3><p>Sawmilling, lumber dressing and custom profiles.</p></div></li>
              <li><span>02</span><div><h3>Prepare</h3><p>Timber sorted and bundled for project requirements.</p></div></li>
              <li><span>03</span><div><h3>Deliver</h3><p>Haulage support for materials and project loads.</p></div></li>
            </ol>
            <Link className="btn btn-primary" href="/services">Explore Services <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
