import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PageHeader } from "@/components/PageHeader";
import { QuoteCTA } from "@/components/QuoteCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { steelCategories, steelImage } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Steel Products | Company Name",
  description: "Steel products for construction, fabrication and industrial applications."
};

export default function SteelPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Steel Products"
        title="Steel for Strength."
        copy="Steel products for construction, fabrication, structural and industrial applications."
        image={steelImage}
        tone="steel"
      />
      <section className="section steel-section">
        <SectionHeading
          eyebrow="Steel"
          title="Request by Category and Specification."
          copy="Steel products are quantity and specification dependent, so the primary action is to request a quote rather than display fake prices."
        />
        <CategoryGrid items={steelCategories} variant="steel" />
      </section>
      <QuoteCTA
        eyebrow="Haulage"
        title="Need Steel Delivered to Your Site?"
        copy="Connect steel supply with haulage and delivery support for project loads, commercial deliveries and construction material movement."
        cta="Explore Haulage"
        href="/services#haulage"
        secondaryCta="Request Steel Quote"
        secondaryHref="/quote"
      />
    </main>
  );
}
