"use client";

import { business } from "@/lib/business";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

const mapQuery = encodeURIComponent(
  `${business.address.label}, ${business.area}`
);

const contacts = [
  {
    name: "Josh",
    phone: business.phone,
    telephone: business.telephone,
    email: business.email,
    whatsappUrl: business.whatsappUrl,
  },
  {
    name: "Narine",
    phone: "366-3911",
    telephone: "+18683663911",
    email: "barnsjag@live.com",
  },
  {
    name: "Marc",
    phone: "391-0403",
    telephone: "+18683910403",
    email: "marcjagmohan011@gmail.com",
  },
  {
    name: "Anand",
    phone: "337-7402",
    telephone: "+18683377402",
  },
];

const getPhoneLink = (phone: string) => {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
};

const getGmailComposeLink = (email: string, contactName: string) => {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email.trim(),
    su: `Quote or product enquiry | Jagmohan Sawmill — ${contactName}`,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
};

export function Contact() {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-panel">
        <div className="contact-card reveal">
          <p className="eyebrow">Contact</p>

          <h2 id="contact-title">Phone, WhatsApp or Request a Quote.</h2>

          <div className="contact-people">
            {contacts.map((contact) => (
              <article
                className="contact-person"
                aria-labelledby={`contact-${contact.name.toLowerCase()}`}
                key={contact.name}
              >
                <h3 id={`contact-${contact.name.toLowerCase()}`}>
                  {contact.name}
                </h3>

                <dl>
                  <div>
                    <dt>
                      <Phone size={16} aria-hidden="true" />
                      Phone
                    </dt>
                    <dd>
                      <a
                        href={getPhoneLink(contact.telephone)}
                        className="contact-clickable-link"
                        aria-label={`Call ${contact.name} at ${contact.phone}`}
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>

                  {contact.whatsappUrl && (
                    <div>
                      <dt>
                        <MessageCircle size={16} aria-hidden="true" />
                        WhatsApp
                      </dt>
                      <dd>
                        <a
                          href={contact.whatsappUrl}
                          className="contact-clickable-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${contact.name}`}
                        >
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  )}

                  {contact.email && (
                    <div>
                      <dt>
                        <Mail size={16} aria-hidden="true" />
                        Email
                      </dt>
                      <dd>
                        <a
                          href={getGmailComposeLink(
                            contact.email,
                            contact.name
                          )}
                          className="contact-clickable-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Email ${contact.name} at ${contact.email}`}
                        >
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </article>
            ))}
          </div>

          <dl>
            <div>
              <dt>Location</dt>
              <dd>
                <address className="contact-address">
                  {business.address.label}
                </address>
              </dd>
            </div>

            <div>
              <dt>Business Hours</dt>
              <dd>8:00am - 4:00pm</dd>
            </div>
          </dl>

          <div className="contact-actions">
            <a
              className="btn btn-dark"
              href={getPhoneLink(business.telephone)}
            >
              Call Josh
            </a>

            <a
              className="btn btn-whatsapp"
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Josh
            </a>

            <a className="btn btn-primary" href="/quote">
              Request a Quote
            </a>
          </div>
        </div>

        <div className="contact-map" aria-labelledby="map-title">
          <div className="contact-map-heading">
            <h2 id="map-title">
              <MapPin size={20} aria-hidden="true" />
              Find Us in Penal
            </h2>

            <a
              className="text-link"
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <ArrowUpRight size={18} aria-hidden="true" />
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
