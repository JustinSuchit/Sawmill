import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote | Jagmohan Co",
  description: "Request a quote for tools, lumber, steel, haulage, tree removal, sawmill services or other project needs."
};

export default function QuotePage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Request a Quote"
        title="Tell Us What You Need Supplied, Moved, Cut or Cleared."
        copy="Request pricing for lumber, mouldings, tools, concrete sleepers, haulage and sawmill services. Share your project details and our team will be in touch."
      />
      <QuoteForm />
    </main>
  );
}
