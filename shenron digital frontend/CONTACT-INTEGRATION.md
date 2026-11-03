# Contact form

The Contact page is available at `/contact` and `/company/contact`.

When the backend is ready, set `VITE_CONTACT_ENDPOINT` in your local or hosting environment and rebuild. This must be a public endpoint URL, never a secret. Without it, the page explains that online enquiries are not yet available and never reports a successful submission.

The form sends a JSON POST containing `name`, `email`, `company`, `phone`, `message`, `consent` (`"yes"`), and `services` (an array of selected service labels). Optional company and phone values may be empty strings. A successful HTTP response displays confirmation and clears the form. Failed requests preserve the entered details for retry.

The backend should validate and limit these fields, record consent as appropriate, add spam/rate protection, and allow the website origin if hosted separately. Return a successful HTTP status only after accepting the enquiry. No enquiry is stored in browser storage.

Build locally with `npm.cmd run build -- --configLoader runner` on Windows where the default config bundler cannot access parent directories.
