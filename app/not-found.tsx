import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-hero" aria-labelledby="not-found-title">
        <div className="page-hero-content">
          <p className="eyebrow">Page Not Found</p>
          <h1 id="not-found-title">This page is not available.</h1>
          <p>The requested page could not be found. Return to the home page or request a quote.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/">Home</Link>
            <Link className="btn btn-secondary" href="/quote">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
