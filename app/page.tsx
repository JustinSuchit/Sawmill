import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/Hero";
import { HomeLumberStory } from "@/components/HomeLumberStory";
import { HomeSandFeature } from "@/components/HomeSandFeature";
import { WhyChooseUs } from "@/components/Process";
import { HomeFAQ } from "@/components/HomeFAQ";
import { ExtraCatalog } from "@/components/ExtraCatalog";

export const metadata = {
  ...pageMetadata("Lumber, Materials & Site Services", "Jagmohan Sawmill supplies lumber, materials and site services in Trinidad & Tobago, including mouldings, sand, concrete sleepers, sawmilling and haulage.", "/"),
  title: "Jagmohan Sawmill | Lumber, Materials & Site Services",
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
