import Image from "next/image";
import type { ImageItem } from "@/lib/site-data";

type SiteImageProps = ImageItem & {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function SiteImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 860px) 100vw, 50vw"
}: SiteImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
