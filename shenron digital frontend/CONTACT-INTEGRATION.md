# Admin dashboard and contact integration

Open `/admin` to sign in with `ADMIN_EMAIL` and your admin password. This URL stays at `/admin`; it no longer redirects to `/admin/blogs`. The sidebar provides All articles, New article, and Enquiries. Older `/admin/blogs` links still work. Direct workspace links are `/admin?view=editor` and `/admin?view=enquiries`.

## Local setup

In `shenron digital backend`:

1. Run `npm.cmd install`.
2. Configure `MONGODB_URI`, `ADMIN_EMAIL`, `JWT_SECRET` (a random secret of at least 32 characters), and `CLIENT_ORIGIN` in `.env`. See `.env.example` for all fields.
3. Run `npm.cmd run setup-admin` in your terminal. Enter your chosen password at the hidden prompt. This saves a bcrypt hash directly to `.env`, without saving the plaintext password.
4. Add your provider's `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `MAIL_FROM` to `.env`. Use port 465 for implicit TLS or 587 for STARTTLS. Use a verified sender; your provider may require an app password.
5. Run `npm.cmd run dev`.

In `shenron digital frontend`, run `npm.cmd run dev`. Vite proxies `/api` to `http://127.0.0.1:5000`. Visit `/admin` and sign in.

## Enquiries and emails

The contact form posts to `/api/contact` by default. `VITE_API_BASE_URL` overrides the API base; `VITE_CONTACT_ENDPOINT` overrides the entire contact URL.

The server validates fields, service choices, and consent, rate limits submissions, and saves enquiries to MongoDB before returning success. The inbox supports pagination, search, filtering, status updates, private notes, saved reply drafts, and acknowledgement status. Use Send email to send the reviewed reply through your configured company SMTP mailbox. Save updates stores the status, notes, and draft; changing status alone does not send a reply. A WhatsApp link opens a prefilled draft when a phone number is available. Use Refresh to fetch new enquiries and email status.

Acknowledgements use a persistent queue. Without SMTP configuration, enquiries save and emails stay pending. Restart after changing SMTP settings. Failed sends retry up to five times with increasing delays; admins can retry failed emails from the inbox after fixing delivery settings. Sent means accepted by SMTP, not confirmed inbox delivery. A process interruption between SMTP acceptance and saving delivery status can cause a duplicate acknowledgement.

## Blogs

The article table supports search, category/status filters, preview, editing, publishing/unpublishing, and deletion. The separate editor supports headings, bold/italic/underline, lists, quotes, safe links, inline images, dividers, and undo/redo. Set author, category, cover image and alt text, optional video, featured status, and SEO fields. Preview unsaved articles, save a draft, or publish/update. Published articles appear at `/blog` and `/blog/:slug`; drafts stay private. The backend validates rich content against an allowlist; the public page renders structured React content without executing submitted HTML. Existing plain-text articles remain readable and editable.

Upload PNG/JPEG/WebP covers and inline images up to 5 MB. Optional featured videos accept MP4/WebM uploads up to 10 MB, or YouTube/Vimeo links. Media persists in MongoDB through `/api/media/:id`, with range requests supported for video playback. Use hosted video links for larger files.

## Hosting

Serve frontend and `/api` under the same HTTPS origin using a reverse proxy. Set `NODE_ENV=production`, exact website origin in `CLIENT_ORIGIN`, and production database/SMTP credentials. Admin cookies are HttpOnly, SameSite=Lax, and Secure in production. Mutations require an allowed Origin; login is rate limited. Keep secrets out of frontend environment variables. If using another API origin, use same-site domains for cookie authentication and configure `VITE_API_BASE_URL` before rebuilding. Configure proxy trust for your actual hosting topology before deploying behind proxies; the default rate limiter uses the directly connecting IP.

## Verification

Backend: `npm.cmd test`. Tests create and remove only a uniquely named `shenron_test_*` database on your configured MongoDB server and use a local SMTP sink. No real visitor emails are sent. The database account needs create/drop permissions on that disposable test database. Tests cover validation, auth, origin rejection, enquiry persistence, email delivery/retry, upload/download, draft visibility, publishing, editing, and deleting.

Frontend: `npm.cmd run build -- --configLoader runner`.
