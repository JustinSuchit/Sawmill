import { pageMetadata } from "@/lib/metadata";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LumberMediaSections } from "@/components/LumberMediaSections";
import { LumberNavigation } from "@/components/LumberNavigation";
import { PageHeader } from "@/components/PageHeader";
import { QuoteCTA } from "@/components/QuoteCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { lumberCategories, lumberImage } from "@/lib/site-data";

export const metadata = pageMetadata("Lumber & Timber", "Lumber, timber, mouldings and dressed lumber for construction and woodworking.", "/lumber");

export default function LumberPage() {
  return (
    <main id="main" className="lumber-page">
      <PageHeader
        eyebrow="Lumber & Timber"
        title="Quality Lumber. Ready for the Job."
        copy="From structural applications to general construction, we supply lumber and timber products for a wide range of projects."
        image={lumberImage}
        tone="timber"
      />
      <LumberNavigation />
      <section className="section lumber-texture">
        <SectionHeading
          eyebrow="Lumber"
          title="Lumber for Every Project."
          copy="Explore lumber by type and application. Send your sizes and quantities for current pricing and availability."
        />
        <CategoryGrid items={lumberCategories.filter((item) => item.title !== "Mouldings & Dressed Lumber")} />
      </section>
      <LumberMediaSections />
      <QuoteCTA
        eyebrow="Sawmill Connection"
        title="Need Lumber Cut to Size?"
        copy="Need a specific cut or timber dimension? Our sawmill services can help process timber to suit your project requirements."
        cta="Explore Sawmill Services"
        href="/services#sawmill-services"
      />
    </main>
  );
}
