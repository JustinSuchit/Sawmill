import { getCatalog } from "@/lib/catalog";
import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { business } from "@/lib/business";
import { siteUrl } from "@/lib/metadata";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title:
    `${business.name} | Lumber, Sawmill & Site Services`,
  description:
    business.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title:
      "Lumber, Steel, Haulage & Tree Services in Trinidad & Tobago",
    description:
      business.description,
    siteName: business.name,
    ...(siteUrl ? { images: [{ url: new URL("/images/og-jagmohan-yard.jpg", siteUrl).href, width: 1200, height: 630, alt: `${business.name} timber yard` }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Lumber, Sawmill, Steel, Haulage & Tree Services",
    description:
      business.description,
    ...(siteUrl ? { images: [new URL("/images/og-jagmohan-yard.jpg", siteUrl).href] } : {}),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  ...(siteUrl ? { "@id": new URL("/#business", siteUrl).href, image: new URL("/images/og-jagmohan-yard.jpg", siteUrl).href, logo: new URL("/images/jagmohan-company-logo-256.webp", siteUrl).href } : {}),
  name: business.name,
  alternateName: business.alternateName,
  description:
    business.description,
  areaServed: "Trinidad and Tobago",
  email: business.email,
  telephone: business.telephone,
  ...(siteUrl ? { url: siteUrl.href } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressCountry: "TT",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "00:00",
    },
  ],

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = await getCatalog();
  const data = { ...structuredData, hasOfferCatalog: { "@type": "OfferCatalog", name: "Materials and Site Services", itemListElement: catalog.map(item => ({ "@type": "Offer", itemOffered: { "@type": item.page === "services" ? "Service" : "Product", name: item.title, ...(siteUrl ? { url: new URL(item.page === "services" ? `/services#${item.id}` : item.page === "home" ? "/" : `/${item.page}`, siteUrl).href } : {}) } })) } };
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <meta name="theme-color" content="#121713" />

        <script dangerouslySetInnerHTML={{ __html: `(function(){var theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';try{var saved=localStorage.getItem('industrial-theme');if(saved==='dark'||saved==='light')theme=saved;}catch(e){}document.documentElement.dataset.theme=theme;})();` }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
