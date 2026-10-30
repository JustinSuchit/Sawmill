import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/Hero";
import { HomeLumberStory } from "@/components/HomeLumberStory";
import { HomeSandFeature } from "@/components/HomeSandFeature";
import { WhyChooseUs } from "@/components/Process";
import { HomeFAQ } from "@/components/HomeFAQ";
import { ExtraCatalog } from "@/components/ExtraCatalog";

export const metadata = {
  ...pageMetadata("Lumber & Site Services", "Jagmohan Sawmill in Penal supplies lumber, mouldings, sand, tools and concrete sleepers, plus sawmill and haulage services across Trinidad & Tobago.", "/"),
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
