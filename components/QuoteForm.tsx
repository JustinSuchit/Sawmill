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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function updateField(name: FieldName, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: false }));
    setStatus("");
    setSuccess(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);

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

    window.setTimeout(() => {
      setStatus("Your quote request is ready. Connect this form to email, CRM or backend handling before launch.");
      setSuccess(true);
      setLoading(false);
    }, 350);
  }

  return (
    <section className="quote-section" id="quote" aria-labelledby="quote-title">
      <div className="quote-copy reveal">
        <p className="eyebrow">Request a Quote</p>
        <h2 id="quote-title">Tell Us What You Need Moved, Cut, Supplied or Cleared.</h2>
        <p>
          This front-end form validates entries and prepares a professional request. Connect it to the company&apos;s email,
          CRM or backend endpoint when those details are available.
        </p>
      </div>
      <form className="quote-form reveal" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label>Full Name <input name="name" autoComplete="name" required value={form.name} aria-invalid={errors.name || undefined} className={errors.name ? "error" : undefined} onChange={(event) => updateField("name", event.target.value)} /></label>
          <label>Company <input name="company" autoComplete="organization" value={form.company} onChange={(event) => updateField("company", event.target.value)} /></label>
          <label>Phone <input name="phone" inputMode="tel" autoComplete="tel" required value={form.phone} aria-invalid={errors.phone || undefined} className={errors.phone ? "error" : undefined} onChange={(event) => updateField("phone", event.target.value)} /></label>
          <label>Email <input name="email" type="email" autoComplete="email" required value={form.email} aria-invalid={errors.email || undefined} className={errors.email ? "error" : undefined} onChange={(event) => updateField("email", event.target.value)} /></label>
          <label>Request Type
            <select name="requestType" required value={form.requestType} aria-invalid={errors.requestType || undefined} className={errors.requestType ? "error" : undefined} onChange={(event) => updateField("requestType", event.target.value)}>
              <option value="">Select one</option>
              <option>Tools</option><option>Lumber</option><option>Steel</option><option>Haulage</option><option>Tree Removal</option><option>Sawmill Services</option><option>Other</option>
            </select>
          </label>
          <label>Product/Service
            <select name="service" required value={form.service} aria-invalid={errors.service || undefined} className={errors.service ? "error" : undefined} onChange={(event) => updateField("service", event.target.value)}>
              <option value="">Select one</option>
              <option>Tools & Hardware</option><option>Lumber</option><option>Steel</option><option>Haulage</option><option>Tree Removal</option><option>Sawmill Services</option><option>Material Delivery</option><option>Other</option>
            </select>
          </label>
          <label>Quantity <input name="quantity" placeholder="Approximate quantity or load size" value={form.quantity} onChange={(event) => updateField("quantity", event.target.value)} /></label>
          <label>Location <input name="location" autoComplete="street-address" required value={form.location} aria-invalid={errors.location || undefined} className={errors.location ? "error" : undefined} onChange={(event) => updateField("location", event.target.value)} /></label>
          <label>Preferred Date <input name="date" type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} /></label>
          <label className="wide">Specifications <textarea name="specifications" rows={4} placeholder="Sizes, material type, application, delivery needs or service details" value={form.specifications} onChange={(event) => updateField("specifications", event.target.value)}></textarea></label>
          <label className="wide">Message <textarea name="message" rows={5} required value={form.message} aria-invalid={errors.message || undefined} className={errors.message ? "error" : undefined} onChange={(event) => updateField("message", event.target.value)}></textarea></label>
          <label className="wide file-field">File Upload / Photos <input name="files" type="file" multiple accept="image/*,.pdf" /></label>
        </div>
        <p className={`form-status${success ? " success" : ""}`} aria-live="polite">{status}</p>
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Preparing Request..." : "Submit Quote Request"}</button>
      </form>
    </section>
  );
}
