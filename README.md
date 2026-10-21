# Industrial Trinidad & Tobago Website

Next.js multi-page website for a lumber, sawmill, steel, hardware, haulage, tree cutting, tree removal and land clearing company.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Deployments

The Vercel project `jagmohanco` is connected to `JustinSuchit/Sawmill`.
Pushes to `main` should automatically build and deploy to
`https://jagmohanco.vercel.app` through Vercel's native GitHub integration.
Other branches use preview deployments.

After pushing, check that Vercel creates a deployment for the new commit SHA
and reaches `Ready` in the Production environment. A successful Git push alone
does not confirm deployment. Keep the production branch set to `main`, the
Ignored Build Step set to `Automatic`, and the repository connection enabled.

## Routes

- `/` - overview home page
- `/products` - tools and sawmill supplies
- `/lumber` - lumber, mouldings, pallets and export
- `/steel` - concrete sleepers (existing route retained)
- `/services` - sawmill, haulage, tree services and process
- `/quote` - controlled quote request form
- `/quote/thanks` - confirmation after the email provider completes a submission
- `/contact` - contact details, verified Penal address and Google Maps

## Launch Notes

Replace placeholder company details before publishing:

- Phone and WhatsApp numbers
- Production domain

The verified business name and quote email are centralized in `lib/business.ts`.
The verified Penal address and Google Maps query use the same business data.
Unverified phone, WhatsApp and hours remain unchanged.

## Production URL and Images

Set `SITE_URL` to the verified public website origin before building for production.
On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when available.
Canonical links, social image URLs, sitemap entries and the robots sitemap link
use that origin. Without either setting, the sitemap is intentionally empty;
no localhost or invented production domain is published.

Existing source photos are preserved. Next.js serves responsive WebP derivatives
through its image optimizer. The social preview is a JPEG derived from the existing
timber-yard photo. Internal page headers also use optimized images.

For an isolated local preview, set `NEXT_DIST_DIR=.next-review` before running
`npm run dev -- --port 3001`. This keeps a separate `.next` directory from another
running development session.

## Quote Email Delivery

The quote form posts to FormSubmit for delivery to `joshjagmohan93@gmail.com`.
Emails use the table template with a Jagmohan Co quote-request subject and the
customer's email as Reply-To. Photos and PDFs are limited to 10 MB combined.
FormSubmit handles spam verification, then redirects to `/quote/thanks` on the
origin from which the customer submitted. Product and service quote links prefill
the form; site services require a location and show an optional preferred date.

Before launch, submit a quote request from the deployed website and click the
FormSubmit activation link sent to the recipient inbox (check spam as well).
Email delivery requires that one-time confirmation. Verify a complete request
and attachment arrive in the inbox after activation.
