import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact | Company Name",
  description: "Contact Company Name for tools, lumber, steel, haulage, tree removal and sawmill service quotes."
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Contact"
        title="Phone, WhatsApp, Email or Request a Quote."
        copy="Placeholder company contact details are preserved exactly as supplied so verified business information can be added before launch."
      />
      <Contact />
    </main>
  );
}
