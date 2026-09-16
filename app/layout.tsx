import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumber, Sawmill, Steel, Haulage & Tree Services in Trinidad & Tobago",
  description:
    "A professional Trinidad & Tobago supplier for lumber, timber, sawmill services, steel, hardware, tools, haulage, tree cutting, tree removal and land clearing.",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    title: "Lumber, Steel, Haulage & Tree Services in Trinidad & Tobago",
    description:
      "Reliable materials, sawmill capabilities, haulage and site services for contractors, property owners and industrial clients across Trinidad & Tobago.",
    images: ["https://images.fordaq.com/newsletter/452730/IMG_8070.jpeg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumber, Sawmill, Steel, Haulage & Tree Services",
    description: "Construction materials and field services for Trinidad & Tobago."
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Company Name Placeholder",
  description:
    "Supplier of lumber, steel, tools and hardware with sawmill, haulage, tree cutting, tree removal and land clearing services in Trinidad & Tobago.",
  areaServed: "Trinidad and Tobago",
  telephone: "Phone number placeholder",
  email: "Email placeholder",
  address: {
    "@type": "PostalAddress",
    addressCountry: "TT",
    addressLocality: "Location placeholder"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Materials and Site Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lumber and timber supply" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sawmill services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Steel and hardware supply" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Haulage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tree removal" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Land clearing" } }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#121713" />
        <link rel="preconnect" href="https://images.fordaq.com" />
        <link rel="preconnect" href="https://assets.weforum.org" />
        <link rel="preconnect" href="https://www.mcf-bois.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
