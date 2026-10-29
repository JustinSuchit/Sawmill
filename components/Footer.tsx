import Link from "next/link";
import { business } from "@/lib/business";

const year = new Date().getFullYear();
const emailComposeUrl = `https://mail.google.com/mail/?${new URLSearchParams({
  view: "cm",
  fs: "1",
  to: business.email.trim(),
  su: "Quote or product enquiry | Jagmohan Sawmill — Josh",
}).toString()}`;

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">JC</span>
          <span><strong>{business.name}</strong><small>Materials. Sawmill. Haulage.</small></span>
        </Link>
        <p>Supplier of lumber, steel, tools and hardware with sawmill, haulage, tree cutting, tree removal and land clearing services in Trinidad & Tobago.</p>
      </div>
      <nav aria-label="Footer navigation">
        <h2>Navigation</h2>
        <Link href="/">Home</Link><Link href="/products">Tools</Link><Link href="/lumber">Lumber</Link><Link href="/steel">Concrete Sleepers</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link>
      </nav>
      <nav aria-label="Footer products">
        <h2>Products</h2>
        <Link href="/products">Tools</Link><Link href="/lumber">Lumber</Link><Link href="/steel">Concrete Sleepers</Link><Link href="/quote">Request a Quote</Link>
      </nav>
      <nav aria-label="Footer services">
        <h2>Services</h2>
        <Link href="/services#white-plastering-sand">White Plastering Sand</Link><Link href="/services#haulage">Haulage</Link><Link href="/services#trailer-haulage">Trailer Haulage</Link><Link href="/services#tree-removal">Tree Removal</Link><Link href="/services#sawmill-services">Sawmill Services</Link>
      </nav>
      <address>
        <h2>Contact</h2>
        Phone: <a href={`tel:${business.telephone}`}>{business.phone}</a><br />
        WhatsApp: <a href={business.whatsappUrl}>{business.phone}</a><br />
        <a href={emailComposeUrl} target="_blank" rel="noopener noreferrer" aria-label="Email Josh in Gmail (opens in a new tab)">{business.email}</a><br />
        {business.address.street}, {business.address.locality}<br />
        Trinidad & Tobago
      </address>
      <p className="copyright">© {year} {business.name}. All rights reserved.</p>
    </footer>
  );
}
