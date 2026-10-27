import { getPageProducts } from "@/lib/catalog";
import { productCard, type CatalogPage } from "@/lib/catalog-types";
import { CategoryGrid } from "./CategoryGrid";

export async function ManagedCatalog({ page }: { page: CatalogPage }) {
  const products = await getPageProducts(page);
  if (!products.length) return null;
  return <CategoryGrid items={products.map(productCard)} variant={page === "products" ? "tools" : page === "steel" ? "steel" : "default"} />;
}
