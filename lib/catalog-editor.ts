import type { CatalogProduct } from "./catalog-types";

export function catalogValidationError(product: CatalogProduct): string | null {
  for (const [name, value, limit] of [
    ["Name", product.title, 160], ["Category label", product.label, 80],
    ["Description", product.description, 3000], ["Image description", product.image_alt, 250],
  ] as const) {
    if (!value.trim()) return `${name} is required.`;
    if ([...value.trim()].length > limit) return `${name} must be ${limit} characters or fewer.`;
  }
  if (product.price !== null && (!Number.isFinite(product.price) || product.price < 0 || product.price > 99999999 || Math.abs(product.price * 100 - Math.round(product.price * 100)) > 0.00001)) {
    return "Enter a price from 0 to 99,999,999 with no more than two decimal places, or leave it blank.";
  }
  if (!Number.isInteger(product.sort_order) || product.sort_order < 0 || product.sort_order > 9999) return "Display order must be a whole number from 0 to 9999.";
  if ([...product.price_unit.trim()].length > 80) return "Price unit must be 80 characters or fewer.";
  if ([...product.specs.trim()].length > 2000) return "Specifications / pricing notes must be 2,000 characters or fewer.";
  const examples = product.examples.map(value => value.trim()).filter(Boolean);
  if (examples.length > 50) return "Use no more than 50 sizes / examples, one per line.";
  if ([...examples.join(",")].length > 10000) return "Sizes / examples must total 10,000 characters or fewer.";
  if (!/^(100|[0-9]{1,2})% (100|[0-9]{1,2})%$/.test(product.image_position)) return "Choose a valid photo crop.";
  return null;
}
