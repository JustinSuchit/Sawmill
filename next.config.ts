import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/webp"],
    remotePatterns: [
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
