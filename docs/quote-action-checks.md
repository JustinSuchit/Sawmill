# Quote Action Refinement

Verified locally on 2026-10-26 at http://localhost:3002/ using a production build.

## Changes

- Kept the global header and homepage hero quote buttons.
- Removed ten redundant enquiry actions: homepage closing banner; tools help banner
  and material-bridge quote button; processed-lumber button; lumber closing secondary
  quote button; sleeper-gallery button and closing secondary quote button; two service
  photo-section buttons and the closing services banner.
- Product cards retain quieter Get Pricing links with unique accessible names.
- Services retain one contextual enquiry per service.
- Mouldings and pallets retain contextual text links with 44px minimum height.
- Contact page retains its single quote action; footer navigation remains unchanged.
- Contact details, product options, prices, assets and form behavior are unchanged.

## Verification

- Production build and source ESLint passed.
- Eight routes at 1440, 768, 390 and 320px in both themes: 64 layout checks passed.
- No horizontal overflow, missing main heading or broken completed images observed.
- All 16 product/service links tested at 1440px and 390px. Correct product/service
  and category preselection confirmed after navigation (32 handoff checks).
- Mouldings link also checked with Enter; Lumber category and mouldings product retained.
- Mobile navigation quote link reaches the general quote form.
- Contact page contains exactly one quote link in its main content.
- Desktop product links and mobile mouldings section inspected visually.
- Browser error log empty. No enquiry was submitted.
- Business data, Contact, Footer and QuoteForm have no code changes.

The revised pages are local only until separately committed and deployed.
