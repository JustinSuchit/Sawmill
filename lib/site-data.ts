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
  "/images/lumber/logging/hero_img.png";

export const toolImage =
  "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1400&q=80";

export const lumberImage =
  "/images/lumber/products/stacked-hardwood-lumber.jpg";

export const steelImage =
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80";

export const treeRemovalImage =
  "https://boomrooierijweijtmans.nl/storage/app/uploads/public/645/621/c2d/645621c2d1541835105532.jpg";

export const sawmillImage =
  "/images/lumber/sawmill/sawmill-woodmizer.jpg";

export const homeCapabilities: CategoryCard[] = [
  {
    label: "Tools",
    title: "Professional tools and hardware.",
    description:
      "Professional tools and hardware for construction, maintenance and everyday jobs.",
    href: "/products",
    cta: "Explore Tools",
    src: toolImage,
    alt: "Hardware tools arranged for construction work",
  },
  {
    label: "Lumber",
    title: "Lumber and timber products.",
    description:
      "A range of lumber and timber products for construction and general applications.",
    href: "/lumber",
    cta: "Explore Lumber",
    src: lumberImage,
    alt: "Stacks of locally processed hardwood lumber",
  },
  {
    label: "Steel",
    title: "Concrete sleepers.",
    description:
      "Concrete sleepers available with sale and rental options.",
    href: "/steel",
    cta: "Explore Steel",
    src: steelImage,
    alt: "Concrete sleepers",
  },
  {
    label: "Haulage",
    title: "Transportation and delivery.",
    description:
      "Transportation and delivery services for materials, equipment and loads.",
    href: "/services#haulage",
    cta: "View Haulage",
    src: "/images/lumber/delivery/lumber-delivery-truck.jpg",
    alt: "Lumber loaded onto delivery truck",
  },
  {
    label: "Tree Removal",
    title: "Tree cutting and clearing.",
    description:
      "Tree cutting, removal and property clearing services.",
    href: "/services#tree-removal",
    cta: "View Tree Removal",
    src: treeRemovalImage,
    alt: "Representative tree removal operation with safety equipment",
  },
  {
    label: "Sawmill",
    title: "Sawmill and blade services.",
    description:
      "Bandsaw resharpening and blade setting services.",
    href: "/services#sawmill-services",
    cta: "View Sawmill",
    src: sawmillImage,
    alt: "Wood-Mizer sawmill processing timber",
  },
];

export const toolCategories: CategoryCard[] = [
  {
    label: "Bandsaw",
    title: "Bandsaw Blades",
    description:
      "Bandsaw blades available for Wood-Mizer and wood bandsaw applications.",
    href: "/quote",
    cta: "Request a Quote",
    src: toolImage,
    alt: "Bandsaw blades for sawmill operations",
    examples: [
      "Wood-Mizer",
      "Wideband 4-inch",
      "Wideband 5-inch",
      "Wideband 6-inch",
      "Wood bandsaw 80-inch",
      "Wood bandsaw 93.5-inch",
    ],
  },
  {
    label: "Sharpening",
    title: "Sharpening Stones",
    description:
      "Sharpening stones and wheels for sawmill blade maintenance.",
    href: "/quote",
    cta: "Request a Quote",
    src: toolImage,
    alt: "Sharpening wheel for sawmill blades",
    examples: [
      "Ripper 37 7° 5-inch BN Sharpening Wheel",
      "Tyrolit 10-inch",
      "Tyrolit",
    ],
  },
  {
    label: "Welding",
    title: "Welding Electrodes",
    description:
      "Bridge Brand welding electrodes available in 10 gauge and 12 gauge.",
    href: "/quote",
    cta: "Request a Quote",
    src: toolImage,
    alt: "Welding electrodes",
    specs:
      "AWS A5.1 E6013. Certification: 150 2560-A-E35 0RA12.",
    examples: [
      "10 Gauge - 11 lb box - $80.00",
      "10 Gauge - 44 lb case - $300.00",
      "12 Gauge - 11 lb box - $75.00",
      "12 Gauge - 44 lb case - $280.00",
    ],
  },
  {
    label: "Nailing",
    title: "Nail Guns & Coil Nails",
    description:
      "Nail guns and coil nails for construction and woodworking applications.",
    href: "/quote",
    cta: "Request a Quote",
    src: toolImage,
    alt: "Nail gun and coil nails",
    examples: [
      "CN70 Nail Gun",
      "CN100 Nail Gun",
      "2-inch Coil Nails",
      "2.25-inch Coil Nails",
      "2.5-inch Coil Nails",
    ],
  },
];

export const lumberCategories: CategoryCard[] = [
  {
    label: "Lumber",
    title: "Dimensional Lumber",
    description:
      "Standard and custom-sized lumber available for a range of construction and woodworking requirements.",
    href: "/quote",
    cta: "Request a Quote",
    src: lumberImage,
    alt: "Stacks of locally processed hardwood lumber",
    specs: "Custom and standard sizes available.",
  },
  {
    label: "Lumber",
    title: "Treated Lumber",
    description:
      "Lumber available with pest treatment and heat treatment options.",
    href: "/quote",
    cta: "Request a Quote",
    src: "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?auto=format&fit=crop&w=1100&q=80",
    alt: "Treated lumber boards",
    specs: "Pest treatment and heat treatment available.",
  },
  {
    label: "Hardwood",
    title: "Hardwood Lumber",
    description:
      "Hardwood lumber available for applications requiring dense and durable timber.",
    href: "/quote",
    cta: "Request a Quote",
    src: "https://images.unsplash.com/photo-1520637736862-4d197d17c23a?auto=format&fit=crop&w=1100&q=80",
    alt: "Hardwood lumber",
    specs:
      "Starting at $16.00 per square foot. Availability varies by wood type.",
    examples: [
      "Olivier",
      "Tapana",
      "Roble",
      "Apamate",
    ],
  },
  {
    label: "Softwood",
    title: "Softwood Lumber",
    description:
      "Utility-grade lumber suitable for pallets, dunnage, crating, boxes, boxing boards and formwork.",
    href: "/quote",
    cta: "Request a Quote",
    src: "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=1100&q=80",
    alt: "Softwood lumber boards",
    specs: "Starting at $6.00 per square foot.",
    examples: [
      "Hogplum",
      "Cajuca",
      "Sandbox",
      "Milkwood",
      "Immortelle",
      "Mahoe",
    ],
  },
  {
    label: "Semi-Hardwood",
    title: "Semi-Hardwood Lumber",
    description:
      "Medium-density utility hardwoods offering flexibility, high shock resistance and good machinability.",
    href: "/quote",
    cta: "Request a Quote",
    src: lumberImage,
    alt: "Stacks of locally processed hardwood lumber",
    specs:
      "Starting at $9.00 per square foot. Availability varies by wood type.",
    examples: [
      "Pois Doux",
      "Tantakayo",
      "Juniper",
      "Blackheart",
      "Balata",
      "Locust",
      "Mousarra",
      "Crappo",
    ],
  },
  {
    label: "Imported Lumber",
    title: "Southern Yellow Pine",
    description:
      "Imported Southern Yellow Pine available in a range of commonly used dimensions.",
    href: "/quote",
    cta: "Request a Quote",
    src: lumberImage,
    alt: "Stacks of locally processed hardwood lumber",
    specs: "Starting at $13.00 per square foot.",
    examples: [
      "1x12",
      "1x4",
      "1x3",
      "2x2",
      "2x4",
      "2x6",
      "1x6",
      "1x8",
    ],
  },
  {
    label: "Mouldings & Dressed Lumber",
    title: "Mouldings & Dressed Lumber",
    description:
      "Professional lumber dressing and moulding services, including custom designs.",
    href: "/quote",
    cta: "Request a Quote",
    src: lumberImage,
    alt: "Stacks of locally processed hardwood lumber",
    specs:
      "Dressing starts at $1.50 per square foot. Crown mouldings, base mouldings, premium decking and flooring available.",
    examples: [
      "Lumber dressing",
      "Crown mouldings",
      "Base mouldings",
      "Premium decking",
      "Flooring",
      "Custom designs",
    ],
  },
];

export const steelCategories: CategoryCard[] = [
  {
    label: "Steel",
    title: "Concrete Sleepers",
    description:
      "Concrete sleepers available with sale and rental options.",
    href: "/quote",
    cta: "Request a Quote",
    src: steelImage,
    alt: "Concrete sleepers",
    specs: "Sale and rental options available.",
  },
];

export const serviceDetails: ServiceDetail[] = [
  {
    eyebrow: "Haulage & Delivery",
    title: "Transportation for materials, equipment and project loads.",
    description:
      "Transportation and delivery support for materials, equipment and commercial loads.",
    href: "/quote",
    cta: "Request Haulage Quote",
    src: "/images/lumber/delivery/lumber-delivery-truck.jpg",
    alt: "Lumber loaded onto delivery truck",
    items: [
      "Lumber transportation",
      "Steel transportation",
      "Construction material delivery",
      "Equipment transportation",
      "Timber hauling",
      "Commercial deliveries",
    ],
  },
  {
    eyebrow: "Tree Removal",
    title: "Tree cutting and removal for property-clearing requirements.",
    description:
      "Tree cutting, removal and property clearing support.",
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
      "Large tree removal",
    ],
  },
  {
    eyebrow: "Sawmill Services",
    title: "Bandsaw resharpening and blade setting.",
    description:
      "Bandsaw resharpening and blade setting services for qualifying blades.",
    href: "/quote",
    cta: "Request Sawmill Service",
    src: sawmillImage,
    alt: "Wood-Mizer sawmill processing timber",
    items: [
      "Bandsaw resharpening",
      "Bandsaw blade setting",
      "7° blades",
      "Blades up to 2 inches",
    ],
  },
];

export const products: Product[] = [
  {
    label: "Lumber & Timber",
    title: "Lumber, timber and wood products.",
    description:
      "Dimensional lumber, treated lumber, hardwood, softwood, semi-hardwood, Southern Yellow Pine, mouldings and dressed lumber.",
    src: lumberImage,
    alt: "Stacks of locally processed hardwood lumber",
  },
  {
    label: "Steel",
    title: "Concrete Sleepers",
    description:
      "Concrete sleepers available with sale and rental options.",
    src: steelImage,
    alt: "Concrete sleepers",
  },
  {
    label: "Tools & Sawmill Supplies",
    title: "Bandsaw blades, sharpening stones and workshop supplies.",
    description:
      "Wood-Mizer and wood bandsaw blades, sharpening stones, welding electrodes, nail guns and coil nails.",
    src: toolImage,
    alt: "Sawmill tools and supplies",
  },
];

export const services: Service[] = [
  {
    title: "Bandsaw Resharpening",
    description:
      "Bandsaw resharpening for qualifying blades.",
    src: sawmillImage,
    alt: "Wood-Mizer sawmill processing timber",
  },
  {
    title: "Bandsaw Blade Setting",
    description:
      "Bandsaw blade setting for 7° blades and blades up to 2 inches.",
    src: sawmillImage,
    alt: "Wood-Mizer sawmill processing timber",
  },
  {
    title: "Haulage",
    description:
      "Transportation and delivery support for materials, equipment and commercial loads.",
    src: "/images/lumber/delivery/lumber-haulage-truck.jpg",
    alt: "Flatbed truck carrying processed lumber",
  },
  {
    title: "Tree Cutting",
    description:
      "Tree cutting services for property-clearing requirements.",
    src: "https://assets.weforum.org/article/image/Bo0Qek_KruQYGA-MF9w0MPhRwMvS1aCUtTdLk-TSyFo.JPG",
    alt: "Representative worker using a chainsaw for tree cutting",
  },
  {
    title: "Tree Removal",
    description:
      "Tree removal and property-clearing services.",
    src: treeRemovalImage,
    alt: "Representative tree removal operation with safety equipment",
  },
  {
    title: "Land Clearing",
    description:
      "Property clearing support associated with tree and vegetation removal.",
    src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1100&q=80",
    alt: "Heavy equipment preparing land for development",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    category: "lumber",
    title: "Lumber & Sawmill",
    label: "Lumber & Sawmill",
    className: "tall",
    src: lumberImage,
    alt: "Stacks of locally processed hardwood lumber",
  },
  {
    category: "materials",
    title: "Construction Materials",
    label: "Construction Materials",
    src: steelImage,
    alt: "Construction material category",
  },
  {
    category: "haulage",
    title: "Haulage",
    label: "Haulage",
    className: "wide",
    src: heroImage,
    alt: "Logs stored at a lumber logging yard",
  },
  {
    category: "tree",
    title: "Tree Services",
    label: "Tree Services",
    src: treeRemovalImage,
    alt: "Tree cutting and removal services",
  },
  {
    category: "clearing",
    title: "Land Clearing",
    label: "Land Clearing",
    src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
    alt: "Land clearing operations",
  },
];

export const sawmillImages: ImageItem[] = [
  {
    src: sawmillImage,
    alt: "Wood-Mizer sawmill processing timber",
  },
  {
    src: lumberImage,
    alt: "Stacks of locally processed hardwood lumber",
  },
];

export const woodTypes = {
  softwood: [
    "Hogplum",
    "Cajuca",
    "Sandbox",
    "Milkwood",
    "Immortelle",
    "Mahoe",
  ],
  semiHardwood: [
    "Pois Doux",
    "Tantakayo",
    "Juniper",
    "Blackheart",
    "Balata",
    "Locust",
    "Mousarra",
    "Crappo",
  ],
  hardwood: [
    "Olivier",
    "Tapana",
    "Roble",
    "Apamate",
  ],
  furnitureGrade: [
    "Teak",
    "Cedar",
    "Cypre",
    "Samoan",
    "Redwood",
  ],
} as const;

export const softwoodApplications = [
  {
    title: "Pallets",
    description:
      "Suitable for block and stringer disposable pallets.",
    woodTypes: ["Mahoe", "Cajuca", "Milkwood"],
  },
  {
    title: "Dunnage",
    description:
      "Suitable for dunnage applications.",
    woodTypes: ["Mahoe", "Cajuca", "Milkwood"],
  },
  {
    title: "Crating & Boxes",
    description:
      "Suitable for crating and boxes.",
    woodTypes: ["Sandbox", "Hogplum", "Immortelle"],
  },
  {
    title: "Boxing Boards & Formwork",
    description:
      "Suitable for boxing boards and formwork.",
    woodTypes: ["Sandbox", "Hogplum", "Immortelle"],
  },
] as const;

export const semiHardwoodInfo = {
  startingPrice: "$9.00 per square foot",
  description:
    "Medium-density utility hardwoods offering flexibility, high shock resistance and good machinability.",
  benefits: [
    "Flexibility",
    "High shock resistance",
    "Good machinability",
    "Does not dull blades fast",
  ],
  applications: [
    "Pallets",
    "Dunnage",
    "Crating",
    "Structural purposes (light duty)",
  ],
  additionalBenefit:
    "A replacement for imported pine at lower cost while being more durable.",
  treatmentOptions: [
    "Heat treatment",
    "Chemical treatment",
  ],
} as const;

export const whyItems = [
  [
    "01",
    "Quality Materials",
    "Reliable products for construction and industrial applications.",
  ],
  [
    "02",
    "Reliable Service",
    "Focused on dependable delivery, communication and execution.",
  ],
  [
    "03",
    "One Company. Multiple Capabilities.",
    "Materials, cutting, hauling and removal services under one roof.",
  ],
  [
    "04",
    "Local Expertise",
    "Built for customers and site conditions across Trinidad & Tobago.",
  ],
  [
    "05",
    "Experienced Team",
    "Professional handling of materials, equipment and field services.",
  ],
] as const;

export const processItems = [
  [
    "01",
    "Tell Us What You Need",
    "Submit material, quantity, location or service details.",
  ],
  [
    "02",
    "We Assess the Requirement",
    "Our team reviews the job, quantity, location or specifications.",
  ],
  [
    "03",
    "Receive Your Quote",
    "We provide pricing and availability.",
  ],
  [
    "04",
    "We Get the Job Done",
    "Materials are supplied, transported or the service is completed.",
  ],
] as const;
