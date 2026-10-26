# Report Improvements: Verification

Completed 2026-10-26 against the local production build at http://localhost:3000.
The checks below were completed locally before release. No new PageSpeed score is claimed here.

## Implemented

- Homepage title shortened to 51 characters and description expanded to 155 characters.
- Page-specific social titles/descriptions retain the existing business sharing image.
- JC favicon follows the existing amber brand mark.
- Four server-rendered FAQs use native details/summary controls, with no added client JavaScript.
- Light-surface eyebrow labels use dark amber; dark sections retain bright amber.
- Gallery controls and captions are rendered only while the viewer is open.

## Checks

- Production build passed; ESLint passed with the temporary build directory excluded.
- Eight routes at 1440, 768, 390 and 320px in both themes: 64 checks passed.
- No horizontal overflow, missing main headings or broken completed images in these checks.
- Desktop FAQ heading and list share the same left alignment.
- FAQ Enter/Space toggling and mobile expansion verified.
- FAQ quote link selects Lumber / Dimensional Lumber without submitting a request.
- FAQ mouldings link reaches the matching lumber section.
- Desktop and 320px photo viewers load uncropped images; next/previous work.
- Escape closes the desktop viewer, restores scrolling and returns focus to the opener.
- Closed gallery controls are absent from the DOM.
- Browser error log was empty during the tests.
- Corrected lumber label computed colors: rgb(128, 89, 0) on rgb(245, 247, 245).
- Favicon link and homepage metadata verified in the browser.
- Contact data, Contact component, Footer and QuoteForm have no changes.

## Deliberately Not Applied

- No unverified phone numbers, opening hours, reviews, credentials or social profiles added.
- No analytics or advertising pixels enabled without a separate tracking decision.
- Business email remains readable and clickable for accessibility and usability.
- DNS mail records, business-profile ownership and backlink outreach require business/account input.
- Framework-generated image styles and the small theme initialization script are retained.
  Removing them solely to satisfy an audit could harm image layout or cause theme flicker.
- Existing optimized image delivery is retained; source photographs were not recompressed.
- Re-run live PageSpeed after deployment to measure any score change.
