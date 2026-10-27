import { getPageProducts } from "@/lib/catalog";
import { productCard, type CatalogPage } from "@/lib/catalog-types";
import { CategoryGrid } from "./CategoryGrid";

export async function ExtraCatalog({ page }: { page: CatalogPage }) {
  const products = await getPageProducts(page);
  if (!products.length) return null;
  return <section className="section" aria-label="Products"><div className="section-head"><p className="eyebrow">Our Products</p><h2>Available from Our Yard.</h2></div><CategoryGrid items={products.map(productCard)} /></section>;
}
