import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/Hero";
import { HomeLumberStory } from "@/components/HomeLumberStory";
import { HomeSandFeature } from "@/components/HomeSandFeature";
import { WhyChooseUs } from "@/components/Process";
import { HomeFAQ } from "@/components/HomeFAQ";
import { ExtraCatalog } from "@/components/ExtraCatalog";

export const metadata = {
  ...pageMetadata("Lumber & Site Services", "Jagmohan Sawmill in Penal supplies lumber, timber mouldings, white plastering sand, tools and concrete sleepers, with sawmill, haulage and site services across Trinidad & Tobago.", "/"),
  title: "Jagmohan Sawmill | Lumber & Site Services, Trinidad",
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <HomeLumberStory />
      <HomeSandFeature />
      <ExtraCatalog page="home" />
      <WhyChooseUs />
      <HomeFAQ />
    </main>
  );
}
