export function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-card reveal">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">Phone, WhatsApp or Request a Quote.</h2>
        <dl>
          <div><dt>Phone</dt><dd>Phone number placeholder</dd></div>
          <div><dt>WhatsApp</dt><dd>WhatsApp number placeholder</dd></div>
          <div><dt>Email</dt><dd>Email address placeholder</dd></div>
          <div><dt>Location</dt><dd>Physical location placeholder, Trinidad & Tobago</dd></div>
          <div><dt>Business Hours</dt><dd>Business hours placeholder</dd></div>
        </dl>
        <div className="contact-actions">
          <a className="btn btn-dark" href="tel:+10000000000">Call Us</a>
          <a className="btn btn-whatsapp" href="https://wa.me/10000000000">WhatsApp Us</a>
          <a className="btn btn-primary" href="/quote">Request a Quote</a>
        </div>
      </div>
      <div className="map-placeholder reveal" role="img" aria-label="Map placeholder for company location">
        <span>Google Maps placeholder</span>
        <small>Add the verified Google Maps embed or business profile link here.</small>
      </div>
    </section>
  );
}
