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
    "A professional Trinidad & Tobago supplier for lumber, timber, sawmill services, steel, hardware, tools, haulage, tree cutting, tree removal and land clearing.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title:
      "Lumber, Steel, Haulage & Tree Services in Trinidad & Tobago",
    description:
      "Reliable materials, sawmill capabilities, haulage and site services for contractors, property owners and industrial clients across Trinidad & Tobago.",
    siteName: business.name,
    ...(siteUrl ? { images: [{ url: new URL("/images/og-jagmohan-yard.jpg", siteUrl).href, width: 1200, height: 630, alt: `${business.name} timber yard` }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Lumber, Sawmill, Steel, Haulage & Tree Services",
    description:
      "Construction materials and field services for Trinidad & Tobago.",
    ...(siteUrl ? { images: [new URL("/images/og-jagmohan-yard.jpg", siteUrl).href] } : {}),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  alternateName: business.alternateName,
  description:
    "Supplier of lumber, steel, tools and hardware with sawmill, haulage, tree cutting, tree removal and land clearing services in Trinidad & Tobago.",
  areaServed: "Trinidad and Tobago",
  email: business.email,
  ...(siteUrl ? { url: siteUrl.href } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressCountry: "TT",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Materials and Site Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lumber and timber supply",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sawmill services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Steel and hardware supply",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Haulage",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tree removal",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Land clearing",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            __html: JSON.stringify(structuredData),
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
