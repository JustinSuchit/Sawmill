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

export type CategoryCard = ImageItem & {
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  specs?: string;
  examples?: string[];
};

export type ServiceDetail = ImageItem & {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  items: string[];
};

export const heroImage =
  "https://www.mcf-bois.com/content/uploads/2024/10/photo-chargement-camion.jpg";

export const toolImage =
  "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1400&q=80";

export const lumberImage =
  "https://i.insider.com/60deef604a93e200191299a7?width=1400";

export const steelImage =
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80";

export const treeRemovalImage =
  "https://boomrooierijweijtmans.nl/storage/app/uploads/public/645/621/c2d/645621c2d1541835105532.jpg";

export const sawmillImage =
  "https://darex.rs/uploads/documents/empire_plugin/12.jpg";

export const homeCapabilities: CategoryCard[] = [
  {
    label: "Tools",
    title: "Professional tools and hardware.",
    description: "Professional tools and hardware for construction, maintenance and everyday jobs.",
    href: "/products",
    cta: "Explore Tools",
    src: toolImage,
    alt: "Hardware tools arranged for construction work"
  },
  {
    label: "Lumber",
    title: "Lumber and timber products.",
    description: "A range of lumber and timber products for construction and general applications.",
    href: "/lumber",
    cta: "Explore Lumber",
    src: lumberImage,
    alt: "Representative stacks of logs and finished lumber in a sawmill yard"
  },
  {
    label: "Steel",
    title: "Steel for demanding applications.",
    description: "Steel products available in different sizes, forms and applications.",
    href: "/steel",
    cta: "Explore Steel",
    src: steelImage,
    alt: "Steel pipes and industrial metal stock"
  },
  {
    label: "Haulage",
    title: "Transportation and delivery.",
    description: "Transportation and delivery services for materials, equipment and loads.",
    href: "/services#haulage",
    cta: "View Haulage",
    src: heroImage,
    alt: "Representative flatbed truck loaded with timber and construction materials"
  },
  {
    label: "Tree Removal",
    title: "Tree cutting and clearing.",
    description: "Tree cutting, removal and property clearing services.",
    href: "/services#tree-removal",
    cta: "View Tree Removal",
    src: treeRemovalImage,
    alt: "Representative tree removal operation with safety equipment"
  },
  {
    label: "Sawmill",
    title: "Timber processing and custom cuts.",
    description: "Timber processing and custom sawmill services.",
    href: "/services#sawmill-services",
    cta: "View Sawmill",
    src: sawmillImage,
    alt: "Representative sawmill and log transport operation"
  }
];

export const toolCategories: CategoryCard[] = [
  {
    label: "Tools",
    title: "Hand Tools",
    description: "Category placeholder for hammers, pliers, screwdrivers, wrenches, saws, measuring tools and levels.",
    href: "/quote",
    cta: "View Category",
    src: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative hand tools on a workbench",
    examples: ["Hammers", "Pliers", "Screwdrivers", "Wrenches", "Saws", "Measuring tools", "Levels"]
  },
  {
    label: "Tools",
    title: "Power Tools",
    description: "Category placeholder for drills, grinders, saws, sanders and impact tools.",
    href: "/quote",
    cta: "View Category",
    src: toolImage,
    alt: "Representative power tools and hardware",
    examples: ["Drills", "Grinders", "Saws", "Sanders", "Impact tools"]
  },
  {
    label: "Tools",
    title: "Cutting & Blades",
    description: "Category placeholder for saw blades, cutting discs, drill bits and blades.",
    href: "/quote",
    cta: "View Category",
    src: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative cutting tools and blades",
    examples: ["Saw blades", "Cutting discs", "Drill bits", "Blades"]
  },
  {
    label: "Hardware",
    title: "Construction Hardware",
    description: "Category placeholder for fasteners, bolts, nuts, screws, anchors and general hardware.",
    href: "/quote",
    cta: "View Category",
    src: "https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative construction hardware and fasteners",
    examples: ["Fasteners", "Bolts", "Nuts", "Screws", "Anchors", "General hardware"]
  },
  {
    label: "Safety",
    title: "Safety Equipment",
    description: "Category placeholder for gloves, safety glasses, helmets and protective equipment.",
    href: "/quote",
    cta: "View Category",
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative protective equipment on an industrial site",
    examples: ["Gloves", "Safety glasses", "Helmets", "Protective equipment"]
  }
];

export const lumberCategories: CategoryCard[] = [
  {
    label: "Lumber",
    title: "Dimensional Lumber",
    description: "Standard-sized boards used for general construction and framing.",
    href: "/quote",
    cta: "View Options",
    src: lumberImage,
    alt: "Representative dimensional lumber stacked for construction"
  },
  {
    label: "Lumber",
    title: "Treated Lumber",
    description: "Wood treated for increased resistance to moisture, decay and outdoor conditions.",
    href: "/quote",
    cta: "View Options",
    src: "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative treated lumber boards"
  },
  {
    label: "Timber",
    title: "Hardwood",
    description: "Dense and durable timber suitable for applications requiring strength and longevity.",
    href: "/quote",
    cta: "View Options",
    src: "https://images.unsplash.com/photo-1520637736862-4d197d17c23a?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative hardwood timber texture"
  },
  {
    label: "Timber",
    title: "Softwood",
    description: "Versatile timber commonly used for construction and general applications.",
    href: "/quote",
    cta: "View Options",
    src: "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative softwood planks"
  },
  {
    label: "Timber",
    title: "Timber",
    description: "Larger structural wood sections for construction and heavy-duty applications.",
    href: "/quote",
    cta: "View Options",
    src: "https://images.fordaq.com/newsletter/452730/IMG_8070.jpeg",
    alt: "Representative timber yard with logs"
  },
  {
    label: "Boards",
    title: "Boards & Planks",
    description: "Various board and plank sizes for construction, fabrication and general use.",
    href: "/quote",
    cta: "View Options",
    src: "https://s.yimg.com/ny/api/res/1.2/cGv3bKdNUY54ksTn.ZNpcQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xNTkwO2NmPXdlYnA-/https%3A/media.zenfs.com/es/efe.es/6bf7c384ef9eb233c692633426257ae3",
    alt: "Representative boards and planks at a lumber yard"
  }
];

export const steelCategories: CategoryCard[] = [
  {
    label: "Steel",
    title: "Steel Bars",
    description: "Bars used in construction, reinforcement and fabrication.",
    href: "/quote",
    cta: "Request Quote",
    specs: "Specifications placeholder: size, length, finish and quantity can be added once verified inventory data is available.",
    src: steelImage,
    alt: "Representative steel bars and metal stock"
  },
  {
    label: "Steel",
    title: "Structural Steel",
    description: "Steel products used for structural construction and fabrication.",
    href: "/quote",
    cta: "Request Quote",
    specs: "Specifications placeholder: profile, grade, length and quantity can be added later.",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative structural steel on a construction site"
  },
  {
    label: "Steel",
    title: "Steel Sheets",
    description: "Flat steel products for fabrication and construction applications.",
    href: "/quote",
    cta: "Request Quote",
    specs: "Specifications placeholder: thickness, finish, sheet size and quantity.",
    src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative metal sheets in an industrial setting"
  },
  {
    label: "Steel",
    title: "Steel Plates",
    description: "Heavy-duty steel products for structural and industrial applications.",
    href: "/quote",
    cta: "Request Quote",
    specs: "Specifications placeholder: thickness, dimensions and application details.",
    src: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative heavy steel plates"
  },
  {
    label: "Steel",
    title: "Steel Pipes",
    description: "Steel piping for construction, fabrication and other applications.",
    href: "/quote",
    cta: "Request Quote",
    specs: "Specifications placeholder: diameter, wall thickness, length and quantity.",
    src: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative steel pipes stacked in a yard"
  },
  {
    label: "Steel",
    title: "Steel Sections",
    description: "Different structural steel profiles and sections.",
    href: "/quote",
    cta: "Request Quote",
    specs: "Specifications placeholder: profile type, length, finish and quantity.",
    src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative steel profiles and sections"
  },
  {
    label: "Steel",
    title: "Reinforcement Steel",
    description: "Steel products used for reinforced concrete construction.",
    href: "/quote",
    cta: "Request Quote",
    specs: "Specifications placeholder: diameter, length, bend requirements and quantity.",
    src: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=1100&q=80",
    alt: "Representative reinforcement steel on a construction project"
  }
];

export const serviceDetails: ServiceDetail[] = [
  {
    eyebrow: "Haulage & Delivery",
    title: "Reliable transportation for materials, equipment and project loads.",
    description: "Coordinate movement for materials, equipment and commercial deliveries without inventing fleet capacity, truck size or service radius.",
    href: "/quote",
    cta: "Request Haulage Quote",
    src: heroImage,
    alt: "Representative truck carrying timber materials",
    items: [
      "Lumber transportation",
      "Steel transportation",
      "Construction material delivery",
      "Equipment transportation",
      "Timber hauling",
      "Commercial deliveries"
    ]
  },
  {
    eyebrow: "Tree Removal",
    title: "Professional tree cutting and removal for property-clearing requirements.",
    description: "Tree service support for residential, commercial and property-clearing work, with hauling connected to the removal process.",
    href: "/quote",
    cta: "Request Tree Removal Quote",
    src: treeRemovalImage,
    alt: "Representative tree removal operation with safety equipment",
    items: [
      "Tree cutting",
      "Tree removal",
      "Branch removal",
      "Property clearing",
      "Site cleanup",
      "Large tree removal"
    ]
  },
  {
    eyebrow: "Sawmill Services",
    title: "Transforming timber into usable lumber.",
    description: "Sawmill services can help process timber into usable lumber for construction, fabrication and general applications.",
    href: "/quote",
    cta: "Ask About Custom Cutting",
    src: sawmillImage,
    alt: "Representative sawmill and timber processing operation",
    items: [
      "Timber processing",
      "Lumber cutting",
      "Custom cutting",
      "Timber preparation",
      "Sawn timber"
    ]
  }
];

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
  ["02", "We Assess the Requirement", "Our team reviews the job, quantity, location or specifications."],
  ["03", "Receive Your Quote", "We provide pricing and availability."],
  ["04", "We Get the Job Done", "Materials are supplied, transported or the service is completed."]
] as const;
