"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/business";

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
  message: ""
};

type FieldName = keyof typeof initialForm;

export function QuoteForm({ initialCategory = "", initialProduct = "" }: { initialCategory?: string; initialProduct?: string }) {
  const [form, setForm] = useState({ ...initialForm, requestType: initialCategory, service: initialProduct });
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const isSiteService = ["Haulage & Delivery", "Tree Removal", "Sawmill Services"].includes(form.requestType);

  useEffect(() => {
    const resetLoading = () => setLoading(false);
    window.addEventListener("pageshow", resetLoading);
    return () => window.removeEventListener("pageshow", resetLoading);
  }, []);

  function updateField(name: FieldName, value: string) {
    setForm((current) => ({ ...current, [name]: value, ...(name === "requestType" && current.requestType !== value ? { service: "" } : {}) }));
    setErrors((current) => ({ ...current, [name]: false, ...(name === "requestType" ? { location: false } : {}) }));
    setStatus("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const requiredFields: FieldName[] = ["name", "phone", "email", "requestType", "message", ...(isSiteService ? ["location" as const] : [])];
    const nextErrors: Partial<Record<FieldName, boolean>> = {};
    const emptyField = requiredFields.find((field) => !form[field].trim());

    if (emptyField) {
      requiredFields.forEach((field) => {
        nextErrors[field] = !form[field].trim();
      });
      setErrors(nextErrors);
      setStatus("Please complete all required fields before submitting.");
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>(`[data-field="${emptyField}"]`);
      firstInvalid?.focus();
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors({ email: true });
      setStatus("Please enter a valid email address.");
      event.currentTarget.querySelector<HTMLInputElement>('input[type="email"]')?.focus();
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
    const redirect = formElement.elements.namedItem("_next") as HTMLInputElement;
    redirect.value = new URL("/quote/thanks", window.location.origin).href;
    // Give each attachment a distinct name for the email provider's multipart parser.
    formElement.addEventListener("formdata", (event) => {
      const { formData } = event as FormDataEvent;
      const files = formData.getAll("attachment").filter((file): file is File => file instanceof File && file.size > 0);
      formData.delete("attachment");
      files.forEach((file, index) => formData.append(index === 0 ? "attachment" : `attachment_${index + 1}`, file));
    }, { once: true });
    setStatus("Sending your request. Please complete the verification on the next page.");
    setLoading(true);
    formElement.submit();
  }

  return (
    <section className="quote-section" id="quote" aria-labelledby="quote-title">
      <div className="quote-copy reveal">
        <p className="eyebrow">Request a Quote</p>
        <h2 id="quote-title">A few details.<br />A quote that fits.</h2>
        <p>
          Tell us about your materials, quantities, delivery location or service
          requirements. Our team will review your request and contact you with
          pricing and availability.
        </p>
        <a className="quote-email" href={`mailto:${business.email}`}>{business.email}</a>
      </div>
      <form className="quote-form reveal" action={`https://formsubmit.co/${business.email}`} method="POST" encType="multipart/form-data" onSubmit={handleSubmit} noValidate aria-busy={loading}>
        <input type="hidden" name="_subject" value={`New quote request | ${business.name} | ${form.requestType || "General enquiry"}`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_replyto" value={form.email.trim()} />
        <input type="hidden" name="_next" />
        <p className="form-required-note">Fields marked * are required.</p>
        <div className="form-grid">
          <label>Full Name * <input name="Full Name" data-field="name" autoComplete="name" required value={form.name} aria-invalid={errors.name || undefined} className={errors.name ? "error" : undefined} onChange={(event) => updateField("name", event.target.value)} /></label>
          <label>Company <input name="company" autoComplete="organization" value={form.company} onChange={(event) => updateField("company", event.target.value)} /></label>
          <label>Phone * <input name="phone" data-field="phone" type="tel" autoComplete="tel" required value={form.phone} aria-invalid={errors.phone || undefined} className={errors.phone ? "error" : undefined} onChange={(event) => updateField("phone", event.target.value)} /></label>
          <label>Email * <input name="email" data-field="email" type="email" autoComplete="email" required value={form.email} aria-invalid={errors.email || undefined} className={errors.email ? "error" : undefined} onChange={(event) => updateField("email", event.target.value)} /></label>
          <label>What do you need? *
            <select name="Request Type" data-field="requestType" required value={form.requestType} aria-invalid={errors.requestType || undefined} className={errors.requestType ? "error" : undefined} onChange={(event) => updateField("requestType", event.target.value)}>
              <option value="">Select one</option>
              <option>Lumber</option><option>Tools & Hardware</option><option>Concrete Sleepers</option><option>White Plastering Sand</option><option>Haulage & Delivery</option><option>Tree Removal</option><option>Sawmill Services</option><option>Other</option>
            </select>
          </label>
          <label>{isSiteService ? "Service details" : "Product or material"}<input name="Product or Service" value={form.service} onChange={(event) => updateField("service", event.target.value)} /></label>
          <label>{isSiteService ? "Load size or scope" : "Quantity"}<input name="quantity" placeholder={isSiteService ? "Material, load or area" : "Approximate quantity"} value={form.quantity} onChange={(event) => updateField("quantity", event.target.value)} /></label>
          <label>{isSiteService ? "Site location *" : "Delivery location (if needed)"}<input name="location" data-field="location" autoComplete="street-address" required={isSiteService} value={form.location} aria-invalid={errors.location || undefined} className={errors.location ? "error" : undefined} onChange={(event) => updateField("location", event.target.value)} /></label>
          {isSiteService && <label>Preferred Date <input name="Preferred Date" type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} /></label>}
          <label className="wide">Project details * <textarea name="message" data-field="message" rows={4} placeholder={isSiteService ? "Tell us about the site, access, timing and work required" : "Sizes, wood type, application and any special requirements"} required value={form.message} aria-invalid={errors.message || undefined} className={errors.message ? "error" : undefined} onChange={(event) => updateField("message", event.target.value)} /></label>
          <label className="wide file-field">File Upload / Photos (10 MB total maximum) <input name="attachment" type="file" multiple accept="image/*,.pdf" /></label>
        </div>
        <p className="form-status" aria-live="polite">{status}</p>
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Sending Request..." : "Submit Quote Request"}<ArrowUpRight size={18} aria-hidden="true" /></button>
      </form>
    </section>
  );
}
