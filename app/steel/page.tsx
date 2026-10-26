import { pageMetadata } from "@/lib/metadata";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PageHeader } from "@/components/PageHeader";
import { QuoteCTA } from "@/components/QuoteCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { SleeperFeature } from "@/components/SleeperFeature";
import { steelCategories, steelImage } from "@/lib/site-data";

export const metadata = pageMetadata("Concrete Sleepers", "Concrete sleepers for industrial and infrastructure applications, with sale and rental options.", "/steel");

export default function SteelPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Industrial Materials"
        title="Concrete Sleepers."
        copy="Heavy-duty concrete sleepers for industrial and infrastructure applications. Enquire about sale, rental and delivery."
        image={steelImage}
        imagePosition="50% 32%"
        tone="steel"
      />
      <section className="section steel-section">
        <SectionHeading
          eyebrow="Concrete Sleepers"
          title="Request by Category and Specification."
          copy="Share your required quantity, specifications and location for pricing and availability."
        />
        <CategoryGrid items={steelCategories} variant="steel" />
      </section>
      <SleeperFeature />
      <QuoteCTA
        eyebrow="Haulage"
        title="Need Sleepers Delivered?"
        copy="Coordinate your sleeper requirements with haulage and delivery support for your project location."
        cta="Explore Haulage"
        href="/services#haulage"
      />
    </main>
  );
}
