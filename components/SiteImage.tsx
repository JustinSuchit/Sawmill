import Image from "next/image";

import type { ImageItem } from "@/lib/site-data";

type SiteImageProps = ImageItem & {
  className?: string;
  priority?: boolean;
  sizes?: string;
  cover?: boolean;
  objectPosition?: string;
  quality?: number;
};

export function SiteImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 860px) 100vw, 50vw",
  cover = false,
  objectPosition = "center",
  quality = 75,
}: SiteImageProps) {
  return (
    <span className={`site-image${cover ? " site-image-cover" : ""}${className ? ` ${className}` : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        quality={quality}
        style={{ objectFit: "cover", objectPosition }}
      />
    </span>
  );
}
