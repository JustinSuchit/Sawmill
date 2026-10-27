import type { CategoryCard } from "./site-data";

export const catalogPages = { products: "Tools & Hardware", lumber: "Lumber", steel: "Concrete Sleepers", home: "Homepage", services: "Services" } as const;
export type CatalogPage = keyof typeof catalogPages;
export type CatalogProduct = {
  id: string; page: CatalogPage; title: string; label: string; description: string;
  image_src: string; image_alt: string; thumbnail_src: string | null; image_position: string;
  specs: string; examples: string[]; price: number | null; price_unit: string;
  sort_order: number; published: boolean; archived: boolean; updated_at: string;
};

export function productCard(product: CatalogProduct): CategoryCard {
  return { id: product.id, title: product.title, label: product.label, description: product.description,
    src: product.image_src, alt: product.image_alt, thumbnailSrc: product.thumbnail_src || undefined,
    imagePosition: product.image_position, specs: product.specs, examples: product.examples,
    price: product.price, priceUnit: product.price_unit, href: "/quote", cta: "Get Pricing" };
}

export function validImageSource(value: string): boolean {
  if (/^\/images\/[^?#]+\.(jpe?g|png|webp|avif)$/i.test(value) && !value.includes("..")) return true;
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!projectUrl) return false;
  try {
    const url = new URL(value);
    return url.origin === new URL(projectUrl).origin && /^\/storage\/v1\/object\/public\/product-thumbnails\/[a-zA-Z0-9/_-]+\.(jpg|png|webp|avif)$/.test(url.pathname) && !url.search;
  } catch { return false; }
}
