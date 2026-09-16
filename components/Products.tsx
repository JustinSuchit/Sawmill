import { products } from "@/lib/site-data";
import { SiteImage } from "./SiteImage";

export function Products() {
  return (
    <section className="section products" id="products" aria-labelledby="products-title">
      <div className="section-head reveal">
        <p className="eyebrow">Products</p>
        <h2 id="products-title">Everything You Need to Build.</h2>
        <p>
          A focused supply point for construction and industrial materials, organized around the categories customers ask for most.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="feature-card reveal" key={product.label}>
            <SiteImage src={product.src} alt={product.alt} sizes="(max-width: 860px) 100vw, 33vw" />
            <div>
              <p className="label">{product.label}</p>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <a className="text-link" href="#quote">View Products</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
