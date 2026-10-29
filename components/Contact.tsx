
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

// Generate a clean telephone link
const getPhoneLink = (phone: string) => {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
};

// Generate an email link for the default email application
const getEmailLink = (email: string) => {
  return `mailto:${email.trim()}`;
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

          <h2 id="contact-title">
            Phone, WhatsApp or Request a Quote.
          </h2>

          <div className="contact-people">
            {contacts.map((contact) => (
              <article
                className="contact-person"
                aria-labelledby={`contact-${contact.name.toLowerCase()}`}
                key={contact.name}
              >
                <h3
                  id={`contact-${contact.name.toLowerCase()}`}
                >
                  {contact.name}
                </h3>

                <dl>
                  {/* PHONE NUMBER */}
                  <div>
                    <dt>
                      <Phone
                        size={16}
                        aria-hidden="true"
                      />
                      Phone
                    </dt>

                    <dd>
                      <a
                        href={getPhoneLink(contact.telephone)}
                        className="contact-clickable-link"
                        aria-label={`Call ${contact.name} at ${contact.phone}`}
                        title={`Call ${contact.name}`}
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>

                  {/* WHATSAPP */}
                  {contact.whatsappUrl && (
                    <div>
                      <dt>
                        <MessageCircle
                          size={16}
                          aria-hidden="true"
                        />
                        WhatsApp
                      </dt>

                      <dd>
                        <a
                          href={contact.whatsappUrl}
                          className="contact-clickable-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${contact.name}`}
                          title={`Message ${contact.name} on WhatsApp`}
                        >
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  )}

                  {/* EMAIL */}
                  {contact.email && (
                    <div>
                      <dt>
                        <Mail
                          size={16}
                          aria-hidden="true"
                        />
                        Email
                      </dt>

                      <dd>
                        <a
                          href={getEmailLink(contact.email)}
                          className="contact-clickable-link"
                          aria-label={`Email ${contact.name} at ${contact.email}`}
                          title={`Email ${contact.name}`}
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

          {/* BUSINESS DETAILS */}
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

          {/* CONTACT ACTION BUTTONS */}
          <div className="contact-actions">
            <a
              className="btn btn-dark"
              href={getPhoneLink(business.telephone)}
              aria-label="Call Josh"
            >
              Call Josh
            </a>

            <a
              className="btn btn-whatsapp"
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Josh"
            >
              WhatsApp Josh
            </a>

            <a
              className="btn btn-primary"
              href="/quote"
            >
              Request a Quote
            </a>
          </div>
        </div>

        {/* GOOGLE MAP */}
        <div
          className="contact-map"
          aria-labelledby="map-title"
        >
          <div className="contact-map-heading">
            <h2 id="map-title">
              <MapPin
                size={20}
                aria-hidden="true"
              />
              Find Us in Penal
            </h2>

            <a
              className="text-link"
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />
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

      {/* CONTACT LINK STYLING */}
      <style>{`
        .contact-section .contact-clickable-link {
          display: inline-block;
          position: relative;
          z-index: 2;

          color: #16a34a !important;
          text-decoration: underline !important;
          text-decoration-color: #16a34a !important;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 4px;

          font-weight: 600;
          cursor: pointer;
          pointer-events: auto;

          overflow-wrap: anywhere;

          padding: 3px 0;

          transition:
            color 0.2s ease,
            text-decoration-color 0.2s ease,
            opacity 0.2s ease;
        }

        /* Hover */
        .contact-section .contact-clickable-link:hover {
          color: #15803d !important;
          text-decoration-color: #15803d !important;
          opacity: 0.85;
        }

        /* Active / tapped */
        .contact-section .contact-clickable-link:active {
          color: #166534 !important;
        }

        /* Keyboard accessibility */
        .contact-section .contact-clickable-link:focus-visible {
          outline: 2px solid #16a34a;
          outline-offset: 4px;
          border-radius: 3px;
        }

        /* Mobile layout */
        @media (max-width: 640px) {
          .contact-section .contact-clickable-link {
            padding: 6px 0;
            max-width: 100%;
            overflow-wrap: anywhere;
            -webkit-tap-highlight-color:
              rgba(22, 163, 74, 0.15);
          }
        }
      `}</style>
    </section>
  );
}
