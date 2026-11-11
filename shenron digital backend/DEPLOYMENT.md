# Local and live configuration

The backend loads `.env` from its working directory. Keep a different `.env` on each machine. Never upload your local `.env` over the live server's `.env` or commit credentials.

## Local computer

Your existing `.env` uses `NODE_ENV=development`, `PORT=5000`, `HOST=127.0.0.1`, and `CLIENT_ORIGIN=http://localhost:5173`. Other credentials are preserved.

Run `npm run dev` inside the backend folder, and `npm run dev` inside the frontend folder. Open `http://localhost:5173/admin`.

## Live server

1. Copy `.env.production.example` to `.env` inside the backend folder on the live server only.
2. Fill in `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `JWT_SECRET`, and `SMTP_PASSWORD`. Use a separate production database to isolate live data. Generate a long random JWT secret and run `npm run setup-admin` on the server to set the admin password hash.
3. Keep `CLIENT_ORIGIN=https://kravsinfotech.com`. If you also serve the frontend from `https://www.kravsinfotech.com`, add that origin separated by a comma.
4. Run the backend with `npm start` under your hosting platform's process manager. The platform must support a continuously running Node.js process for queued emails. Use platform-provided host/port settings where required; otherwise keep port 5000 and host 127.0.0.1 behind a reverse proxy on the same server.
5. Build the frontend with `npm run build`. Serve its `dist` folder over HTTPS, forward `/api` requests to `http://127.0.0.1:5000` while preserving the `/api` path, and configure frontend routes such as `/admin` to fall back to `index.html`. The Vite development proxy does not run in production. Leave `VITE_API_BASE_URL` unset for this same-domain setup.
6. Check `https://kravsinfotech.com/api/health`, then open `https://kravsinfotech.com/admin`. Run `npm run verify-smtp` in the live backend folder to verify SMTP without sending email.

Restart the backend after changing `.env`. If local and live configurations use the same MongoDB database, both sites will read and modify the same data.

## Admin recovery and sessions

The sign-in page includes **Forgot password?**. Recovery links are sent only to `ADMIN_EMAIL` through the configured SMTP mailbox. Links expire after 15 minutes and work once. Requests are limited per IP, with a one-minute mailbox cooldown. The link uses the first `CLIENT_ORIGIN`, so put your canonical frontend URL first and use HTTPS in production.

The admin account is created in MongoDB on first sign-in or recovery request using `ADMIN_PASSWORD_HASH`. After that, MongoDB stores the current password hash; changing the environment hash or running `setup-admin` does not replace an existing database account password. Use email recovery to change an existing account password. Keep database backups and protect the recovery mailbox.

Password resets and logout revoke all admin sessions across devices. Cookies are HttpOnly, SameSite=Lax, and Secure in production. Previous tokens issued before this update are invalidated. Restart the backend and rebuild/deploy the frontend to enable the new flow. SMTP verification checks connection/authentication; actual recovery delivery also depends on your provider accepting and delivering the mail.
