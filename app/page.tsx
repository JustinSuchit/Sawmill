import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/Hero";
import { HomeLumberStory } from "@/components/HomeLumberStory";
import { WhyChooseUs } from "@/components/Process";
import { QuoteCTA } from "@/components/QuoteCTA";

export const metadata = pageMetadata("Lumber, Sawmill & Site Services", "Lumber, mouldings, tools, concrete sleepers, haulage and sawmill services in Trinidad & Tobago.", "/");

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <HomeLumberStory />
      <WhyChooseUs />
      <QuoteCTA
        title="Ready to Price the Job?"
        copy="Send the product, service, quantity, location or specification details and the team can prepare the next step."
      />
    </main>
  );
}
