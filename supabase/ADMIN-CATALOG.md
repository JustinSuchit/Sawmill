# Products and services admin

Open /admin and sign in with an approved admin account.

- Add product creates a draft; choose its page, photo, description and optional TTD price.
- Add service creates a service using the existing Services page formatting.
- Edit works for published, draft and archived entries, including the existing services, mouldings and pallets.
- Published shows the item on the website.
- Draft saves an item privately until it is ready.
- Archive / hide removes an unavailable item from the public catalogue without deleting its content or photo.
- Select Status > Archived to find hidden items. Edit them or click Publish to show them again.
- Saving Published in the editor also restores an archived item.
- Prices are optional and shown in TTD inclusive of VAT. Service enquiry links retain the selected service.

Changes refresh the website after saving; an already open visitor tab may need reloading. If a refresh fails, the admin status explains the delay and the catalogue refreshes within about a minute.

## Existing catalogue import

Run supabase/seed-managed-services.sql once when upgrading an existing database. It imports the five existing services plus mouldings and pallets, preserving their IDs and anchors. The import is safe to repeat: it does not overwrite existing rows or admin changes. Existing database access policies continue to protect drafts and archives. No schema change or new credentials are needed.

## Verification

The transactional regression test in supabase/tests/catalog-publication.sql checks public visibility and non-admin write denial, plus admin editing and republishing. Run it with an administrative SQL connection; all fixture changes roll back. It requires at least one confirmed approved admin.
