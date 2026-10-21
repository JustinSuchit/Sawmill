# Design and Performance Checks

## Live baseline (before this change)

Recorded 2026-10-21 for `/lumber` on production commit `7cf227e`.
[PageSpeed report](https://pagespeed.web.dev/analysis/https-jagmohanco-vercel-app-lumber/qbchm4cceg?form_factor=mobile).

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance score | 92 | 100 |
| Accessibility score | 96 | 96 |
| Largest Contentful Paint | 3.3 s | 0.5 s |
| Cumulative Layout Shift | 0 | 0 |
| Total Blocking Time | 30 ms | 10 ms |

These are Lighthouse lab results, not real-user measurements. PageSpeed reported
no field data. Mobile used an emulated Moto G Power and slow 4G. No analytics or
visitor telemetry was enabled. Re-run PageSpeed after production deployment;
local layout checks and image byte counts are not a new Lighthouse score.

## Image delivery

Compared 750px-wide optimized responses. Live used WebP at quality 75; the local
thumbnail configuration used AVIF at quality 65. Original source files remain
unchanged. Larger dialog views use quality 75 and offer an original-photo link.

| Source | Live bytes | Local bytes |
| --- | ---: | ---: |
| stacked-hardwood-lumber.jpg | 223424 | 69793 |
| hardwood.webp | 199702 | 63316 |
| stacked-processed-lumber.jpg | 92944 | 31495 |
| Total | 516070 | 164604 |

The sampled response bodies are 68.1% smaller in aggregate. Actual savings vary
by photo, viewport, format support and cache state. WebP fallback was also checked.
The lumber page now has one image preload for its hero; catalogue thumbnails use
native lazy loading. Full-size dialog images are requested only when opened.

## Video review

The sawmill clip is 2096714 bytes (about 2 MB), with its `moov` metadata before
`mdat` for fast-start playback. It retains `preload="none"`, native controls and
inline playback. No autoplay or unnecessary recompression was added.

## Verification

- Production build and ESLint passed.
- Eight routes checked at 1440, 768, 390 and 320px in both themes: 64 checks,
  with no horizontal overflow, missing headings, broken loaded images or collapsed frames.
- Moulding and product dialogs checked on desktop and mobile: uncropped images,
  next/previous, arrow keys, Escape, focus return and restored background scrolling.
- Native modal focus behavior, original-image links and phone-sized controls checked.
- Lumber anchor targets, selected category state and horizontal navigation checked.
- Product quote handoff checked without submitting an enquiry.
- Contact details, prices and size options, including `1x10`, retained.
- Product label contrast: 6.27:1 on white in light mode, 10.51:1 on the restored dark surface.
