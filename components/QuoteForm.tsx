"use client";

import { FormEvent, useState } from "react";

const initialForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  requestType: "",
  service: "",
  quantity: "",
  location: "",
  date: "",
  specifications: "",
  message: ""
};

type FieldName = keyof typeof initialForm;

export function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(name: FieldName, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: false }));
    setStatus("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const requiredFields: FieldName[] = ["name", "phone", "email", "requestType", "service", "location", "message"];
    const nextErrors: Partial<Record<FieldName, boolean>> = {};
    const emptyField = requiredFields.find((field) => !form[field].trim());

    if (emptyField) {
      requiredFields.forEach((field) => {
        nextErrors[field] = !form[field].trim();
      });
      setErrors(nextErrors);
      setStatus("Please complete all required fields before submitting.");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors({ email: true });
      setStatus("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const formElement = event.currentTarget;
    const attachments = new FormData(formElement).getAll("attachment");
    const totalSize = attachments.reduce((total, file) => total + (file instanceof File ? file.size : 0), 0);

    if (totalSize > 10 * 1024 * 1024) {
      setStatus("Please keep the combined size of your photos and documents under 10 MB.");
      return;
    }

    setErrors({});
    setStatus("Sending your request. Please complete the verification on the next page.");
    setLoading(true);
    formElement.submit();
  }

  return (
    <section className="quote-section" id="quote" aria-labelledby="quote-title">
      <div className="quote-copy reveal">
        <p className="eyebrow">Request a Quote</p>
        <h2 id="quote-title">Tell Us What You Need Moved, Cut, Supplied or Cleared.</h2>
        <p>
          Tell us about your materials, quantities, delivery location or service
          requirements. Our team will review your request and contact you with
          pricing and availability.
        </p>
      </div>
      <form className="quote-form reveal" action="https://formsubmit.co/joshjagmohan93@gmail.com" method="POST" encType="multipart/form-data" onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="_subject" value={`New quote request | Jagmohan Co | ${form.requestType || "General enquiry"}`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_replyto" value={form.email.trim()} />
        <div className="form-grid">
          <label>Full Name <input name="Full Name" autoComplete="name" required value={form.name} aria-invalid={errors.name || undefined} className={errors.name ? "error" : undefined} onChange={(event) => updateField("name", event.target.value)} /></label>
          <label>Company <input name="company" autoComplete="organization" value={form.company} onChange={(event) => updateField("company", event.target.value)} /></label>
          <label>Phone <input name="phone" inputMode="tel" autoComplete="tel" required value={form.phone} aria-invalid={errors.phone || undefined} className={errors.phone ? "error" : undefined} onChange={(event) => updateField("phone", event.target.value)} /></label>
          <label>Email <input name="email" type="email" autoComplete="email" required value={form.email} aria-invalid={errors.email || undefined} className={errors.email ? "error" : undefined} onChange={(event) => updateField("email", event.target.value)} /></label>
          <label>Request Type
            <select name="Request Type" required value={form.requestType} aria-invalid={errors.requestType || undefined} className={errors.requestType ? "error" : undefined} onChange={(event) => updateField("requestType", event.target.value)}>
              <option value="">Select one</option>
              <option>Tools</option><option>Lumber</option><option>Steel</option><option>Haulage</option><option>Tree Removal</option><option>Sawmill Services</option><option>Other</option>
            </select>
          </label>
          <label>Product/Service
            <select name="Product or Service" required value={form.service} aria-invalid={errors.service || undefined} className={errors.service ? "error" : undefined} onChange={(event) => updateField("service", event.target.value)}>
              <option value="">Select one</option>
              <option>Tools & Hardware</option><option>Lumber</option><option>Steel</option><option>Haulage</option><option>Tree Removal</option><option>Sawmill Services</option><option>Material Delivery</option><option>Other</option>
            </select>
          </label>
          <label>Quantity <input name="quantity" placeholder="Approximate quantity or load size" value={form.quantity} onChange={(event) => updateField("quantity", event.target.value)} /></label>
          <label>Location <input name="location" autoComplete="street-address" required value={form.location} aria-invalid={errors.location || undefined} className={errors.location ? "error" : undefined} onChange={(event) => updateField("location", event.target.value)} /></label>
          <label>Preferred Date <input name="Preferred Date" type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} /></label>
          <label className="wide">Specifications <textarea name="specifications" rows={4} placeholder="Sizes, material type, application, delivery needs or service details" value={form.specifications} onChange={(event) => updateField("specifications", event.target.value)}></textarea></label>
          <label className="wide">Message <textarea name="message" rows={5} required value={form.message} aria-invalid={errors.message || undefined} className={errors.message ? "error" : undefined} onChange={(event) => updateField("message", event.target.value)}></textarea></label>
          <label className="wide file-field">File Upload / Photos (10 MB total maximum) <input name="attachment" type="file" multiple accept="image/*,.pdf" /></label>
        </div>
        <p className="form-status" aria-live="polite">{status}</p>
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Sending Request..." : "Submit Quote Request"}</button>
      </form>
    </section>
  );
}
