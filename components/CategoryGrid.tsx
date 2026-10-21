import type { CategoryCard as CategoryCardData } from "@/lib/site-data";
import { CategoryCard } from "./CategoryCard";

type CategoryGridProps = {
  items: CategoryCardData[];
  variant?: "default" | "steel" | "tools";
};

export function CategoryGrid({ items, variant = "default" }: CategoryGridProps) {
  return (
    <div className={`category-grid ${variant === "tools" ? "category-grid-tools" : ""} ${items.length === 1 ? "category-grid-single" : ""}`}>
      {items.map((item, index) => <CategoryCard key={item.title} item={item} variant={variant} priority={index === 0} />)}
    </div>
  );
}
