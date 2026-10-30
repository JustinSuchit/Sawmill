import { lumberCategories, steelCategories, toolCategories, serviceDetails, type CategoryCard } from "./site-data";
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
  ...seed(lumberCategories, "lumber"),
  ...seed([{ id: "timber-pallets", title: "Timber Pallets", label: "Pallets", description: "Durable timber pallets designed for convenient handling and access from multiple sides.", src: "/images/lumber/pallets/four-way-entry-timber-pallet-side-view.jpg", alt: "Side view of four-way entry timber pallet", href: "/quote", cta: "Get Pallet Pricing" }], "lumber"),
  ...seed(steelCategories, "steel"),
  ...seed(serviceDetails.map((item, index) => ({ id: ["white-plastering-sand", "haulage", "trailer-haulage", "tree-removal", "sawmill-services"][index], title: item.eyebrow, label: item.eyebrow, description: item.description, src: item.src, alt: item.alt, examples: item.items, href: "/quote", cta: item.cta, imagePosition: item.eyebrow === "Trailer Haulage" ? "50% 35%" : "50% 50%" })), "services"),
];
