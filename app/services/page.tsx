import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/PageHeader";
import { Process } from "@/components/Process";
import { ServiceDetailSections } from "@/components/ServiceDetailSections";
import { ServiceMediaSections } from "@/components/ServiceMediaSections";
import { heroImage } from "@/lib/site-data";
import { ExtraCatalog } from "@/components/ExtraCatalog";

export const metadata = pageMetadata("Haulage, Tree Removal & Sawmill Services", "Haulage, tree removal and sawmill services for projects in Trinidad & Tobago.", "/services");

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Services"
        title="More Than Materials."
        copy="We supply, process and move the materials you need while providing specialized services for properties, projects and businesses."
        image={heroImage}
      />
      <ServiceDetailSections />
      <ExtraCatalog page="services" />
      <ServiceMediaSections />
      <Process />
    </main>
  );
}
