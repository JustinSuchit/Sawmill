"use client";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark" aria-hidden="true">TT</span>
          <span><strong>Company Name</strong><small>Industrial supply and site services</small></span>
        </a>
        <p>Supplier of lumber, steel, tools and hardware with sawmill, haulage, tree cutting, tree removal and land clearing services in Trinidad & Tobago.</p>
      </div>
      <nav aria-label="Footer navigation">
        <h2>Navigation</h2>
        <a href="#home">Home</a><a href="#products">Products</a><a href="#services">Services</a><a href="#about">About</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a>
      </nav>
      <nav aria-label="Footer products">
        <h2>Products</h2>
        <a href="#products">Lumber</a><a href="#products">Steel</a><a href="#products">Tools</a><a href="#sawmill">Sawmill</a>
      </nav>
      <nav aria-label="Footer services">
        <h2>Services</h2>
        <a href="#haulage">Haulage</a><a href="#tree-services">Tree Cutting</a><a href="#tree-services">Tree Removal</a><a href="#tree-services">Land Clearing</a>
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
