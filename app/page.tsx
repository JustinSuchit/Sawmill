import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/Hero";
import { HomeLumberStory } from "@/components/HomeLumberStory";
import { WhyChooseUs } from "@/components/Process";
import { QuoteCTA } from "@/components/QuoteCTA";
import { HomeFAQ } from "@/components/HomeFAQ";

export const metadata = {
  ...pageMetadata("Lumber & Site Services", "Jagmohan Sawmill in Penal supplies lumber, timber mouldings, tools and concrete sleepers, with sawmill, haulage and site services across Trinidad & Tobago.", "/"),
  title: "Jagmohan Sawmill | Lumber & Site Services, Trinidad",
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <HomeLumberStory />
      <WhyChooseUs />
      <HomeFAQ />
      <QuoteCTA
        title="Ready to Price the Job?"
        copy="Send the product, service, quantity, location or specification details and the team can prepare the next step."
      />
    </main>
  );
}
