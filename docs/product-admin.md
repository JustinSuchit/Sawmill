# Product administration

Open `/admin` and sign in with your admin email and password. The approved first administrator is `justinsuchit37@gmail.com`. The public contact email remains `joshjagmohan93@gmail.com`.

## Password setup and recovery

If already signed in, choose “Set / change password” in the admin header. Otherwise choose “Set / reset password” on the sign-in form to request a recovery email. The recovery link returns to the existing approved `/admin` callback and routes to `/admin/password` after Supabase verifies the recovery session.

The administrator enters their own password twice on `/admin/password`; at least 12 characters are required. Passwords are sent directly to Supabase Auth, never to application logs or database catalogue tables. A successful password change signs out Supabase sessions so the admin can sign in with their new password. Routine email/password sign-in does not send an email. Existing admin membership and database/storage policies are unchanged.

## Editing the catalogue

- Add a product or edit any existing catalogue card.
- Choose Tools & Hardware, Lumber, Concrete Sleepers, Homepage or Services as its destination. Homepage and Services receive an optional product section only when products are assigned there.
- Add a name, category label, description, thumbnail and image description.
- A price is optional and is displayed in Trinidad and Tobago dollars. Add a unit such as “per square foot”. Existing pricing in specifications or example lists is retained and can be edited in those fields; update it if entering a separate price to avoid contradictory figures.
- Upload JPEG, PNG, WebP or AVIF, up to 5 MB, or use an existing `/images/` path. Existing originals are preserved. Uploaded files use unique names and are never overwritten.
- Add specifications and one size/example per line, choose image crop and display order.
- Save unpublished products as drafts. Published products use the existing CategoryCard component, image viewer and product-specific quote link.
- Remove hides a product and its image from the public catalogue without destroying it. Enable “Removed products” to restore it. Photos are retained so restoration works.
- Concurrent edits are checked against `updated_at`; a stale save asks the admin to reload instead of silently overwriting another edit.

This manages the catalogue cards; promotional hero images, editorial photo sections, services text and company/contact details are outside the product editor. The existing moulding feature is an editorial section; additional moulding products can be added as Lumber catalogue cards.

## Supabase connection

Project: `shgmyyzxcxthafbpvjvl` (Jagmohan Sawmill).

The local `.env.local` is configured and ignored by Git. These two variables have also been saved and verified in Vercel's Production environment with user approval:

```
NEXT_PUBLIC_SUPABASE_URL=https://shgmyyzxcxthafbpvjvl.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<project publishable key>
```

Use the publishable key, never a database password, secret key or service-role key. Public reads, admin product writes and storage uploads are governed by database policies. No privileged key is used by this application.

All migrations under `supabase/migrations` have been applied to the connected project. On a new project apply them in order, using that project's hostname in image constraints and Next.js image configuration. Seed imports use `ON CONFLICT DO NOTHING`; rerunning the import does not overwrite edited products.

Authentication has the production Site URL `https://jagmohanco.vercel.app` and exact redirect URLs `/admin` on that domain, `http://localhost:3000/admin`, and `http://localhost:3004/admin` for review. Add exact callback URLs if using another development port. Avoid broad production wildcards.

New administrators must be explicitly added to `public.catalog_admins` using a lower-case, verified account email by the project owner. The website cannot grant its own users admin privileges. Supabase sends sign-in emails; its built-in sender has rate/recipient limits, so configure production SMTP in Supabase before wider admin rollout.

## Security and refresh

- Anonymous visitors see only published, non-archived products.
- Verified, approved accounts may insert/update products; permanent product deletion is not exposed.
- The admin helper is in a non-exposed `private` schema. Membership is readable only by its matching account; browser clients cannot modify membership.
- Thumbnail writes require admin access and the uploader's own path. Public thumbnail URLs are intentional website images, not private documents. SVG and HTML uploads are rejected.
- Successful saves call an authenticated refresh endpoint. Server-side Auth validation and admin membership are checked before cache invalidation. Scheduled revalidation also occurs every 60 seconds.
- `/admin` is noindex and excluded from robots crawling. This is supplementary to database authorization, not access control itself.

## Verification

- Production build and TypeScript passed (15 generated pages), with the database connected.
- ESLint passed with zero warnings.
- Original email-link authentication succeeded for the approved first admin. Password sign-in replaces that routine flow; the administrator must personally set the password before the first password-based sign-in can be verified.
- Browser tests passed for add, JPEG upload, preview, draft save, edit, move between pages, publish with TT$125.50 per bundle, public thumbnail rendering, quote preselection, remove, restore and return to draft.
- The temporary catalogue row was deleted after tests; 11 original catalogue rows remain. Its uploaded verification image remains in the bucket as an unused business-image copy.
- Authenticated editor layout checks passed at desktop and narrow mobile widths; no clipped fields or horizontal overflow. Public product cards were checked separately at desktop/mobile widths.
- Database transaction tests confirmed anonymous/non-admin writes and self-promotion are denied; admin writes work; drafts/removed products are not public. All SQL fixtures rolled back.
- Anonymous POST to `/api/admin/revalidate` returns 401.
- Raster signature tests accept JPEG/PNG/WebP/AVIF and reject SVG/HTML.
- Supabase performance advisor returned no findings after policy refinements. The remaining project security advisory concerns leaked-password protection, which is disabled by default. With password authentication enabled, the project owner should review this Supabase setting: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection.

The required Vercel Production variables are configured. Push the reviewed changes to `main` to trigger production deployment. Preview environments are not configured.
