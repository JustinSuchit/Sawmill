import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { business } from "@/lib/business";

export const metadata: Metadata = { title: `Thank You | ${business.name}`, robots: { index: false, follow: false } };

export default function QuoteThanksPage() {
  return (
    <main id="main" className="quote-thanks">
      <div className="thanks-mark"><Check size={32} aria-hidden="true" /></div>
      <p className="eyebrow">{business.name}</p>
      <h1>Thank you for<br />your enquiry.</h1>
      <p>Our team will review your project details and contact you about pricing and availability.</p>
      <p>Need to add something? Email <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
      <Link className="btn btn-primary" href="/lumber">Explore Lumber <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </main>
  );
}
