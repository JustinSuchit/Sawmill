import type { Metadata } from "next";
import { business } from "./business";

const configuredUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;

function resolveSiteUrl(): URL | undefined {
  if (!configuredUrl) return undefined;
  const url = new URL(configuredUrl.includes("://") ? configuredUrl : `https://${configuredUrl}`);
  if (!["https:", "http:"].includes(url.protocol) || /^(localhost|127\.0\.0\.1)$/.test(url.hostname)) {
    throw new Error("SITE_URL must be the public website URL, not a localhost address.");
  }
  return new URL(url.origin);
}

export const siteUrl = resolveSiteUrl();

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const images = siteUrl ? [{ url: new URL("/images/og-jagmohan-yard.jpg", siteUrl).href, width: 1200, height: 630, alt: `${business.name} timber yard` }] : undefined;
  return {
    title: `${title} | ${business.name}`,
    description,
    openGraph: { title: `${title} | ${business.alternateName}`, description, ...(siteUrl ? { url: new URL(path, siteUrl).href } : {}), siteName: business.name, type: "website", images },
    twitter: { card: "summary_large_image", title: `${title} | ${business.alternateName}`, description, images },
    ...(siteUrl ? { alternates: { canonical: new URL(path, siteUrl).href } } : {}),
  };
}
