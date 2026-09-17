import type { CategoryCard as CategoryCardData } from "@/lib/site-data";
import { CategoryCard } from "./CategoryCard";

type CategoryGridProps = {
  items: CategoryCardData[];
  variant?: "default" | "steel";
};

export function CategoryGrid({ items, variant = "default" }: CategoryGridProps) {
  return (
    <div className="category-grid">
      {items.map((item) => <CategoryCard key={item.title} item={item} variant={variant} />)}
    </div>
  );
}
