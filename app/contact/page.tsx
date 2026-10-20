import { pageMetadata } from "@/lib/metadata";
import { Contact } from "@/components/Contact";
import { PageHeader } from "@/components/PageHeader";

export const metadata = pageMetadata("Contact", "Contact Jagmohan Co for lumber, materials, haulage and sawmill service quotes.", "/contact");

export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Contact"
        title="Phone, WhatsApp, Email or Request a Quote."
        copy="Get in touch about material supply, timber processing, delivery or site services."
      />
      <Contact />
    </main>
  );
}
