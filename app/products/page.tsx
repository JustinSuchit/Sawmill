import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PageHeader } from "@/components/PageHeader";
import { QuoteCTA } from "@/components/QuoteCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { lumberCategories, steelCategories, toolCategories, toolImage } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Tools & Hardware | Company Name",
  description: "Tools, hardware and construction products for contractors, tradesmen and projects in Trinidad & Tobago."
};

export default function ProductsPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Tools & Hardware"
        title="Tools Built for the Job."
        copy="Reliable tools and hardware for contractors, tradesmen, maintenance teams and everyday projects."
        image={toolImage}
      />
      <section className="section">
        <SectionHeading
          eyebrow="Tools"
          title="Tool Categories Ready for a Product Catalogue."
          copy="These categories are structured for future inventory integration and do not claim specific stock, pricing or availability."
        />
        <CategoryGrid items={toolCategories} />
      </section>
      <QuoteCTA
        eyebrow="Need Something Specific?"
        title="Can't find what you're looking for?"
        copy="Contact our team and we'll help you find the right product."
      />
      <section className="section cross-links" aria-labelledby="tools-cross-title">
        <SectionHeading
          eyebrow="Materials"
          title="Looking for Materials for Your Next Project?"
          copy="Tools often go with lumber and steel supply. Browse the material categories or request a quote with your project details."
        />
        <CategoryGrid items={[lumberCategories[0], steelCategories[0]]} />
      </section>
    </main>
  );
}
