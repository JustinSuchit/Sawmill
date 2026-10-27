import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 75],
    remotePatterns: [
      { protocol: "https", hostname: "shgmyyzxcxthafbpvjvl.supabase.co", pathname: "/storage/v1/object/public/product-thumbnails/**" },
      { protocol: "https", hostname: "www.mcf-bois.com" },
      { protocol: "https", hostname: "i.insider.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "s.yimg.com" },
      { protocol: "https", hostname: "media.zenfs.com" },
      { protocol: "https", hostname: "images.fordaq.com" },
      { protocol: "https", hostname: "darex.rs" },
      { protocol: "https", hostname: "assets.weforum.org" },
      { protocol: "https", hostname: "boomrooierijweijtmans.nl" },
      { protocol: "https", hostname: "cdn.realdania.dk" }
    ]
  }
};

export default nextConfig;
