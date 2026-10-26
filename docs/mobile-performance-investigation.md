# Mobile Performance Investigation

Investigated 2026-10-26. Production baseline: commit 97feb6d.
The fixes below are local and have not been deployed or scored by PageSpeed.

## Live Baseline

Two fresh homepage mobile runs scored 99 and 100, with LCP of 2.0s and 1.9s,
TBT of 10ms and 0ms, and CLS of 0. Desktop scored 100 (LCP 0.6s, TBT 0ms).
Accessibility, Best Practices and SEO were 100. No field data was available.

- https://pagespeed.web.dev/analysis/https-jagmohanco-vercel-app/l6fk8d7x9q?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-jagmohanco-vercel-app/4dfc7oerq9?form_factor=mobile

The audit's mobile score of 85 was not reproduced. Its cause cannot be established
from the PDF alone; the fresh results do not rule out cold-cache/network variance.

## Findings and Fixes

- Canonical HTTPS homepage: zero redirects, HTTP 200. HTTP redirects once to HTTPS.
  No extra canonical redirect chain was found; HTTPS enforcement was retained.
- Lighthouse flagged missing high fetch priority on the hero preload. Priority images
  now set fetchPriority=high, confirmed on both the image and its preload in the DOM.
- Homepage hero quality is now 65 rather than 75. Local 750px AVIF response decreased
  from 38252 to 27294 bytes (28.6%). Source PNG and framing remain unchanged.
- Card sizes now account for container padding, gaps and actual grid breakpoints.
- Vercel returned the original 134807-byte, 900px nailer AVIF for both 640px and 750px
  optimizer URLs. The local Next optimizer resized this file, so a local-only check
  had not exposed the production difference. Original live/local SHA256 matched.
- Added a WebP thumbnail for the homepage/tools nailer cards. Its 900px source is
  74696 bytes; local 640px responses are 11228 bytes (AVIF) and 24024 bytes (WebP).
  These are measured local transfers, not promised production savings. The original
  AVIF is unchanged and remains the viewer/original-photo source.

## Verification

- Production build passed; source ESLint passed.
- Eight routes at 1440, 768, 390 and 320px in light and dark themes: 64 checks passed.
- No horizontal overflow, missing checked headings, broken completed images, or
  duplicate hero preloads were observed in the relevant checks.
- Inspected loaded desktop and mobile hero images; existing layout and palette retained.
- Mobile tools viewer loaded and preserved the original image link; Escape closed it.
- Browser error log empty. AVIF and WebP thumbnail fallback responses returned HTTP 200.
- Business/contact data, Contact, Footer and QuoteForm are unchanged.
- Local test build: http://localhost:3001/ (separate from the existing port 3000 server).

After deployment, verify the nailer thumbnail's real Vercel transfer size and rerun
PageSpeed before claiming a post-fix score improvement.
