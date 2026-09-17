import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PageHeader } from "@/components/PageHeader";
import { QuoteCTA } from "@/components/QuoteCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { lumberCategories, lumberImage } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Lumber & Timber | Company Name",
  description: "Quality lumber and timber products for construction and general applications."
};

export default function LumberPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Lumber & Timber"
        title="Quality Lumber. Ready for the Job."
        copy="From structural applications to general construction, we supply lumber and timber products for a wide range of projects."
        image={lumberImage}
        tone="timber"
      />
      <section className="section lumber-texture">
        <SectionHeading
          eyebrow="Lumber"
          title="Lumber for Every Project."
          copy="Categories are organized for future inventory integration without inventing dimensions, species, pricing or availability."
        />
        <CategoryGrid items={lumberCategories} />
      </section>
      <QuoteCTA
        eyebrow="Sawmill Connection"
        title="Need Lumber Cut to Size?"
        copy="Need a specific cut or timber dimension? Our sawmill services can help process timber to suit your project requirements."
        cta="Explore Sawmill Services"
        href="/services#sawmill-services"
        secondaryCta="Request a Quote"
        secondaryHref="/quote"
      />
    </main>
  );
}
