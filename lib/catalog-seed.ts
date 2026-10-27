import { lumberCategories, steelCategories, toolCategories, type CategoryCard } from "./site-data";
import type { CatalogPage, CatalogProduct } from "./catalog-types";

function seed(items: CategoryCard[], page: CatalogPage): CatalogProduct[] {
  return items.map((item, index) => ({
    id: item.id || `${page}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`,
    page, title: item.title, label: item.label, description: item.description, image_src: item.src,
    image_alt: item.alt, thumbnail_src: item.thumbnailSrc || null, image_position: item.imagePosition || "50% 50%",
    specs: item.specs || "", examples: item.examples || [], price: null, price_unit: "",
    sort_order: index, published: true, archived: false, updated_at: "2026-10-26T00:00:00Z",
  }));
}
export const initialCatalog = [
  ...seed(toolCategories, "products"),
  ...seed(lumberCategories.filter(item => item.title !== "Mouldings & Dressed Lumber"), "lumber"),
  ...seed(steelCategories, "steel"),
];
