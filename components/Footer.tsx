"use client";

import Link from "next/link";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">TT</span>
          <span><strong>Company Name</strong><small>Industrial supply and site services</small></span>
        </Link>
        <p>Supplier of lumber, steel, tools and hardware with sawmill, haulage, tree cutting, tree removal and land clearing services in Trinidad & Tobago.</p>
      </div>
      <nav aria-label="Footer navigation">
        <h2>Navigation</h2>
        <Link href="/">Home</Link><Link href="/products">Tools</Link><Link href="/lumber">Lumber</Link><Link href="/steel">Steel</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link>
      </nav>
      <nav aria-label="Footer products">
        <h2>Products</h2>
        <Link href="/products">Tools</Link><Link href="/lumber">Lumber</Link><Link href="/steel">Steel</Link><Link href="/quote">Request a Quote</Link>
      </nav>
      <nav aria-label="Footer services">
        <h2>Services</h2>
        <Link href="/services#haulage">Haulage</Link><Link href="/services#tree-removal">Tree Removal</Link><Link href="/services#sawmill-services">Sawmill Services</Link>
      </nav>
      <address>
        <h2>Contact</h2>
        Phone number placeholder<br />
        WhatsApp number placeholder<br />
        Email address placeholder<br />
        Trinidad & Tobago
      </address>
      <p className="copyright">© {year} Company Name Placeholder. All rights reserved.</p>
    </footer>
  );
}
