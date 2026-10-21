import { business } from "@/lib/business";
import { ArrowUpRight, MapPin } from "lucide-react";

const mapQuery = encodeURIComponent(`${business.address.label}, ${business.area}`);

export function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-card reveal">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">Phone, WhatsApp or Request a Quote.</h2>
        <dl>
          <div><dt>Phone</dt><dd>Phone number placeholder</dd></div>
          <div><dt>WhatsApp</dt><dd>WhatsApp number placeholder</dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${business.email}`}>{business.email}</a></dd></div>
          <div><dt>Location</dt><dd><address className="contact-address">{business.address.label}</address></dd></div>
          <div><dt>Business Hours</dt><dd>Business hours placeholder</dd></div>
        </dl>
        <div className="contact-actions">
          <a className="btn btn-dark" href="tel:+10000000000">Call Us</a>
          <a className="btn btn-whatsapp" href="https://wa.me/10000000000">WhatsApp Us</a>
          <a className="btn btn-primary" href="/quote">Request a Quote</a>
        </div>
      </div>
      <div className="contact-map" aria-labelledby="map-title">
        <div className="contact-map-heading">
          <h2 id="map-title"><MapPin size={20} aria-hidden="true" /> Find Us in Penal</h2>
          <a className="text-link" href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} target="_blank" rel="noopener noreferrer">
            Get Directions <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <iframe
          className="contact-map-embed"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          title={`Google Maps: ${business.address.label}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
