import Image from "next/image";

import type { ImageItem } from "@/lib/site-data";

type SiteImageProps = ImageItem & {
  className?: string;
  priority?: boolean;
  sizes?: string;
  cover?: boolean;
};

export function SiteImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 860px) 100vw, 50vw",
  cover = false,
}: SiteImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className={className}
      priority={priority}
      unoptimized
      sizes={sizes}
      style={{
        width: "100%",
        height: cover ? "100%" : "auto",
      }}
    />
  );
}
