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
- Prices are optional and shown in TTD. Service enquiry links retain the selected service.
- Use Edit on an existing item to replace its photo or change its price. Selecting a photo previews it before saving; Undo photo replacement restores the saved photo. Uploads accept JPEG, PNG, WebP and AVIF up to 5 MB, with file-type and image checks.
- A blank price means no fixed price is shown. Enter an amount and optional unit (for example, per box), or use Remove price to return to enquiries. Zero is a displayed price. Prices already written into notes or size examples remain editable there; the editor flags these so they can be kept consistent.
- Duplicate creates an unsaved draft copy with a new ID, keeping the source unchanged. Edit its details and save it before publishing.
- Live previews use the public card/service components, including sizes and prices after selecting an upload. Mouldings and pallets retain their dedicated lumber layouts, and can also be moved to other catalogue pages.
- Switching items, cancelling or leaving the editor warns about unsaved changes. Save is disabled during an upload check or save, and invalid fields are explained before any upload starts.

Changes refresh the website after saving; an already open visitor tab may need reloading. If a refresh fails, the admin status explains the delay and the catalogue refreshes within about a minute.

## Existing catalogue import

Run supabase/seed-managed-services.sql once when upgrading an existing database. It imports the five existing services plus mouldings and pallets, preserving their IDs and anchors. The import is safe to repeat: it does not overwrite existing rows or admin changes. Existing database access policies continue to protect drafts and archives. No schema change or new credentials are needed.

## Verification

The transactional regression test in supabase/tests/catalog-publication.sql checks public visibility and non-admin write denial, plus admin editing and republishing. Run it with an administrative SQL connection; all fixture changes roll back. It requires at least one confirmed approved admin.

Run `node --experimental-strip-types --test tests/catalog-editor.test.mjs` for pricing, field-limit and image-signature validation checks. For manual verification, use a clearly labelled draft; verify photo replacement, price addition/change/removal and mobile layout without editing published business items.
