import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/Process";
import { QuoteCTA } from "@/components/QuoteCTA";

export const metadata: Metadata = {
  title: "Industrial Supply & Services | Company Name",
  description: "Tools, lumber, steel, haulage, tree removal and sawmill services for projects in Trinidad & Tobago."
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WhyChooseUs />
      <QuoteCTA
        title="Ready to Price the Job?"
        copy="Send the product, service, quantity, location or specification details and the team can prepare the next step."
      />
    </main>
  );
}
