import { business } from "@/lib/business";
import { ArrowUpRight, MapPin } from "lucide-react";

const mapQuery = encodeURIComponent(`${business.address.label}, ${business.area}`);

export function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div className="contact-card reveal">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Phone, WhatsApp or Request a Quote.</h2>
          <dl>
            <div><dt>Phone</dt><dd><a href={`tel:${business.telephone}`}>{business.phone}</a></dd></div>
            <div><dt>WhatsApp</dt><dd><a href={business.whatsappUrl}>{business.phone}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${business.email}`}>{business.email}</a></dd></div>
            <div><dt>Location</dt><dd><address className="contact-address">{business.address.label}</address></dd></div>
            <div><dt>Business Hours</dt><dd>Business hours placeholder</dd></div>
          </dl>
          <div className="contact-actions">
            <a className="btn btn-dark" href={`tel:${business.telephone}`}>Call Us</a>
            <a className="btn btn-whatsapp" href={business.whatsappUrl}>WhatsApp Us</a>
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
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1963.5623936945935!2d-61.4019008!3d10.1564018!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3589187b195061%3A0x58c15ffc350fdfed!2sJ.%20Jagmohan%20%26%20Co.%20Ltd!5e0!3m2!1sen!2sus!4v1560866063640!5m2!1sen!2sus"
            title={`Google Maps: ${business.address.label}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
