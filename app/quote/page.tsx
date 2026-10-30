import { pageMetadata } from "@/lib/metadata";
import { lumberCategories, toolCategories } from "@/lib/site-data";
import { getCatalog } from "@/lib/catalog";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata = pageMetadata("Request a Quote", "Request pricing for lumber, mouldings, materials, haulage and sawmill services.", "/quote");

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const params = await searchParams;
  const product = typeof params.product === "string" ? params.product.trim().slice(0, 160) : "";
  const catalog = await getCatalog();
  const serviceOptions = catalog.filter(item => item.page === "services").map(({ id, title }) => ({ id, title }));
  const managedProduct = catalog.find(item => item.title === product);
  const category = managedProduct?.page === "services" ? managedProduct.title : managedProduct?.page === "lumber" ? "Lumber" : managedProduct?.page === "products" ? "Tools & Hardware" : managedProduct?.page === "steel" ? "Concrete Sleepers" : lumberCategories.some((item) => item.title === product) || /pallet/i.test(product) ? "Lumber" :
    toolCategories.some((item) => item.title === product) ? "Tools & Hardware" :
    /sleeper/i.test(product) ? "Concrete Sleepers" :
    /white plastering sand/i.test(product) ? "White Plastering Sand" :
    /haulage|delivery/i.test(product) ? "Haulage & Delivery" :
    /tree|clearing/i.test(product) ? "Tree Removal" :
    /sawmill/i.test(product) ? "Sawmill Services" : "";
  return (
    <main id="main" className="quote-page">
      <PageHeader
        eyebrow="Request a Quote"
        title="Let's Price Your Project."
        copy="Share your materials or service requirements for pricing and availability."
      />
      <QuoteForm key={`${category}:${product}`} initialCategory={category} initialProduct={product} serviceOptions={serviceOptions} />
    </main>
  );
}
