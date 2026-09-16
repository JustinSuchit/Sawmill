export type ImageItem = {
  src: string;
  alt: string;
};

export type Product = ImageItem & {
  label: string;
  title: string;
  description: string;
};

export type Service = ImageItem & {
  title: string;
  description: string;
};

export type GalleryItem = ImageItem & {
  category: string;
  title: string;
  label: string;
  className?: string;
};

export const heroImage =
  "https://www.mcf-bois.com/content/uploads/2024/10/photo-chargement-camion.jpg";

export const products: Product[] = [
  {
    label: "Lumber & Timber",
    title: "Dimensional lumber, boards and custom-cut timber.",
    description:
      "Construction wood, treated lumber and timber materials ready for builders, carpenters and property work.",
    src: "https://i.insider.com/60deef604a93e200191299a7?width=1100",
    alt: "Representative stacks of logs and finished lumber in a sawmill yard"
  },
  {
    label: "Steel",
    title: "Steel bars, sheets, pipes and structural materials.",
    description:
      "Steel and related hardware for construction, fabrication, repairs and industrial supply needs.",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1100&q=80",
    alt: "Steel pipes and industrial metal stock"
  },
  {
    label: "Tools & Hardware",
    title: "Hand tools, power tools, fasteners and accessories.",
    description:
      "Everyday jobsite essentials for contractors, tradespeople, homeowners and maintenance teams.",
    src: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1100&q=80",
    alt: "Hardware tools arranged for construction work"
  }
];

export const services: Service[] = [
  {
    title: "Sawmill Services",
    description: "Timber processing and custom cutting for practical building needs.",
    src: "https://darex.rs/uploads/documents/empire_plugin/12.jpg",
    alt: "Representative sawmill and log transport operation"
  },
  {
    title: "Haulage",
    description: "Reliable movement of materials, equipment and commercial loads.",
    src: heroImage,
    alt: "Representative flatbed trailer loaded with timber"
  },
  {
    title: "Tree Cutting",
    description: "Professional cutting for residential, commercial and industrial properties.",
    src: "https://assets.weforum.org/article/image/Bo0Qek_KruQYGA-MF9w0MPhRwMvS1aCUtTdLk-TSyFo.JPG",
    alt: "Representative worker using a chainsaw for tree cutting"
  },
  {
    title: "Tree Removal",
    description: "Removal of unwanted, fallen or hazardous trees with hauling support.",
    src: "https://boomrooierijweijtmans.nl/storage/app/uploads/public/645/621/c2d/645621c2d1541835105532.jpg",
    alt: "Representative tree removal operation with safety equipment"
  },
  {
    title: "Land Clearing",
    description: "Clearing trees, branches and vegetation before construction or property use.",
    src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1100&q=80",
    alt: "Heavy equipment preparing land for development"
  },
  {
    title: "Material Delivery",
    description: "Delivery for lumber, steel, tools and other construction supplies.",
    src: "https://cdn.realdania.dk/media/fakjc4km/traeelementer-paa-lastbil-1.jpg",
    alt: "Representative construction materials delivered on a truck"
  }
];

export const galleryItems: GalleryItem[] = [
  {
    category: "lumber",
    title: "Placeholder: Lumber & Sawmill",
    label: "Placeholder - Lumber & Sawmill",
    className: "tall",
    src: "https://s.yimg.com/ny/api/res/1.2/cGv3bKdNUY54ksTn.ZNpcQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xNTkwO2NmPXdlYnA-/https%3A/media.zenfs.com/es/efe.es/6bf7c384ef9eb233c692633426257ae3",
    alt: "Placeholder lumber and sawmill category"
  },
  {
    category: "materials",
    title: "Placeholder: Construction Materials",
    label: "Placeholder - Construction Materials",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    alt: "Placeholder construction material category"
  },
  {
    category: "haulage",
    title: "Placeholder: Haulage",
    label: "Placeholder - Haulage",
    className: "wide",
    src: "https://cdn.realdania.dk/media/fakjc4km/traeelementer-paa-lastbil-1.jpg",
    alt: "Placeholder haulage category"
  },
  {
    category: "tree",
    title: "Placeholder: Tree Services",
    label: "Placeholder - Tree Services",
    src: "https://boomrooierijweijtmans.nl/storage/app/uploads/public/645/621/c2d/645621c2d1541835105532.jpg",
    alt: "Placeholder tree services category"
  },
  {
    category: "clearing",
    title: "Placeholder: Land Clearing",
    label: "Placeholder - Land Clearing",
    src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
    alt: "Placeholder land clearing category"
  }
];

export const sawmillImages: ImageItem[] = [
  {
    src: "https://s.yimg.com/ny/api/res/1.2/cGv3bKdNUY54ksTn.ZNpcQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xNTkwO2NmPXdlYnA-/https%3A/media.zenfs.com/es/efe.es/6bf7c384ef9eb233c692633426257ae3",
    alt: "Representative tropical lumber yard with logs and cut planks"
  },
  {
    src: "https://images.fordaq.com/newsletter/452730/IMG_8070.jpeg",
    alt: "Representative log truck at a timber processing yard"
  }
];

export const whyItems = [
  ["01", "Quality Materials", "Reliable products for construction and industrial applications."],
  ["02", "Reliable Service", "Focused on dependable delivery, communication and execution."],
  ["03", "One Company. Multiple Capabilities.", "Materials, cutting, hauling and removal services under one roof."],
  ["04", "Local Expertise", "Built for customers and site conditions across Trinidad & Tobago."],
  ["05", "Experienced Team", "Professional handling of materials, equipment and field services."]
] as const;

export const processItems = [
  ["01", "Tell Us What You Need", "Submit material, quantity, location or service details."],
  ["02", "We Review the Job", "The team checks requirements, availability and site details."],
  ["03", "Receive Your Quote", "Get pricing, timing and next steps after review."],
  ["04", "We Get It Done", "Materials delivered or services completed."]
] as const;
