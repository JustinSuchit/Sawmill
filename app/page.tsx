import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Haulage } from "@/components/Haulage";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process, WhyChooseUs } from "@/components/Process";
import { Products } from "@/components/Products";
import { QuoteForm } from "@/components/QuoteForm";
import { RevealProvider } from "@/components/RevealProvider";
import { Sawmill } from "@/components/Sawmill";
import { Services } from "@/components/Services";
import { TreeServices } from "@/components/TreeServices";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Products />
        <Sawmill />
        <Services />
        <TreeServices />
        <Haulage />
        <WhyChooseUs />
        <Gallery />
        <Process />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
