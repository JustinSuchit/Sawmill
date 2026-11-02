import assert from "node:assert/strict";
import test from "node:test";
import { catalogValidationError } from "../lib/catalog-editor.ts";
import { imageExtension } from "../lib/catalog-upload.ts";

const item = {
  title: "Test product", label: "Tools", description: "A test product.",
  image_alt: "Test thumbnail", price: null, price_unit: "", specs: "",
  examples: [], image_position: "50% 50%", sort_order: 0,
};

test("optional pricing supports no price, adding a price, changing it, zero and removal", () => {
  for (const price of [null, 125.50, 200, 0, null]) {
    assert.equal(catalogValidationError({ ...item, price }), null);
  }
  for (const price of [-1, NaN, Infinity, 100000000, 1.001]) {
    assert.match(catalogValidationError({ ...item, price }), /price/i);
  }
});

test("invalid or oversized fields are rejected before uploading a photo", () => {
  assert.match(catalogValidationError({ ...item, label: "   " }), /label/i);
  assert.match(catalogValidationError({ ...item, examples: Array(51).fill("size") }), /50/);
  assert.match(catalogValidationError({ ...item, examples: ["x".repeat(10001)] }), /10,000/);
  assert.equal(catalogValidationError({ ...item, examples: [...Array(50).fill("size"), "  "] }), null);
  assert.match(catalogValidationError({ ...item, sort_order: 0.5 }), /whole number/);
  assert.match(catalogValidationError({ ...item, image_position: "101% 50%" }), /crop/i);
});

test("upload type comes from bytes rather than the filename or MIME type", () => {
  assert.equal(imageExtension(new Uint8Array([255,216,255])), "jpg");
  assert.equal(imageExtension(new Uint8Array([137,80,78,71,13,10,26,10])), "png");
  assert.equal(imageExtension(new TextEncoder().encode("RIFFxxxxWEBP")), "webp");
  assert.equal(imageExtension(new TextEncoder().encode("xxxxftypavif")), "avif");
  assert.equal(imageExtension(new TextEncoder().encode("<svg>not an allowed image</svg>")), null);
  assert.equal(imageExtension(new Uint8Array()), null);
});
