# Industrial Trinidad & Tobago Website

Next.js multi-page website for a lumber, sawmill, steel, hardware, haulage, tree cutting, tree removal and land clearing company.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` - overview home page
- `/products` - products and sawmill capabilities
- `/services` - sawmill, haulage, tree services and process
- `/about` - company positioning and quote process
- `/gallery` - filterable placeholder project gallery
- `/quote` - controlled quote request form
- `/contact` - contact details and map placeholder

## Launch Notes

Replace placeholder company details before publishing:

- Company name and logo
- Phone and WhatsApp numbers
- Email address
- Physical location and Google Maps embed
- Real project gallery photos
- Production domain, sitemap URL and Open Graph image

The current gallery is intentionally marked as placeholder because no verified company project photos were available.

## Quote Email Delivery

The quote form posts to FormSubmit for delivery to `joshjagmohan93@gmail.com`.
Emails use the table template with a Jagmohan Co quote-request subject and the
customer's email as Reply-To. Photos and PDFs are limited to 10 MB combined.
FormSubmit handles spam verification and shows its confirmation page after submission.

Before launch, submit a quote request from the deployed website and click the
FormSubmit activation link sent to the recipient inbox (check spam as well).
Email delivery requires that one-time confirmation. Verify a complete request
and attachment arrive in the inbox after activation.
