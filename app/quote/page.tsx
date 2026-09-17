import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote | Company Name",
  description: "Request a quote for tools, lumber, steel, haulage, tree removal, sawmill services or other project needs."
};

export default function QuotePage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Request a Quote"
        title="Tell Us What You Need Supplied, Moved, Cut or Cleared."
        copy="Submit the same front-end request form from the original website, now structured as a React-controlled form ready for a future backend."
      />
      <QuoteForm />
    </main>
  );
}
