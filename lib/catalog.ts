import "server-only";
import { initialCatalog } from "./catalog-seed";
import type { CatalogProduct, CatalogPage } from "./catalog-types";

export async function getCatalog(): Promise<CatalogProduct[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return initialCatalog;
  const response = await fetch(`${url}/rest/v1/catalog_products?select=*&published=eq.true&archived=eq.false&order=sort_order.asc,id.asc`, {
    headers: { apikey: key }, next: { revalidate: 60, tags: ["catalog"] }, signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("The product catalogue is temporarily unavailable.");
  return await response.json() as CatalogProduct[];
}

export async function getPageProducts(page: CatalogPage) {
  return (await getCatalog()).filter(item => item.page === page);
}
