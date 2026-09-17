import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Process } from "@/components/Process";
import { QuoteCTA } from "@/components/QuoteCTA";
import { ServiceDetailSections } from "@/components/ServiceDetailSections";
import { heroImage } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Haulage, Tree Removal & Sawmill Services | Company Name",
  description: "Professional haulage, tree removal and sawmill services in Trinidad & Tobago."
};

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
      <Process />
      <QuoteCTA
        title="Need a Service Quote?"
        copy="Send service details, location, timing and any photos or files that help describe the requirement."
      />
    </main>
  );
}
