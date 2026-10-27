export const thumbnailLimit = 5 * 1024 * 1024;
export function imageExtension(bytes: Uint8Array): "jpg" | "png" | "webp" | "avif" | null {
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "jpg";
  if ([137,80,78,71,13,10,26,10].every((byte, i) => bytes[i] === byte)) return "png";
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  if (ascii(0,4) === "RIFF" && ascii(8,12) === "WEBP") return "webp";
  if (ascii(4,8) === "ftyp" && /avif|avis/.test(ascii(8,32))) return "avif";
  return null;
}
