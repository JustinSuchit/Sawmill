import "server-only";
import { cache } from "react";
import { initialCatalog } from "./catalog-seed";
import type { CatalogProduct, CatalogPage } from "./catalog-types";

export const getCatalog = cache(async (): Promise<CatalogProduct[]> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return initialCatalog;
  const response = await fetch(`${url}/rest/v1/catalog_products?select=*&published=eq.true&archived=eq.false&order=sort_order.asc,id.asc`, {
    headers: { apikey: key }, next: { revalidate: 60, tags: ["catalog"] }, signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("The product catalogue is temporarily unavailable.");
  const products = await response.json() as CatalogProduct[];
  // Migrate the original bundled image without overriding admin-uploaded replacements.
  return products.map(product => product.id === "products-bandsaw-blades" && product.image_src === "/images/bandsaw img.webp"
    ? { ...product, image_src: "/images/tools/coiled-bandsaw-blade.avif", image_alt: "Coiled toothed bandsaw blade" }
    : product);
});

export async function getPageProducts(page: CatalogPage) {
  return (await getCatalog()).filter(item => item.page === page);
}
