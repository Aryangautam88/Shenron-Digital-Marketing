# Shenron Digital Blog Backend

This API stores blog posts in MongoDB, serves published posts to the website, and protects create, edit, and delete actions behind an admin sign-in.

## Setup

Requirements: Node.js 20+ and MongoDB.

1. Copy `.env.example` to `.env` and set `MONGODB_URI`, `ADMIN_EMAIL`, and a random `JWT_SECRET` of at least 32 characters.
2. From this folder, install dependencies with `npm.cmd install`.
3. Generate a password hash with `npm.cmd run hash-password`, then put the result in `ADMIN_PASSWORD_HASH` in `.env`.
4. Start the API with `npm.cmd run backend:dev` from the repository root, or `npm.cmd run dev` from this folder.
5. Start the frontend separately. The Vite dev server proxies `/api` to `http://localhost:5000`.

Open `/admin/blogs` on the website and sign in with the configured email and password. Admin sessions use an HTTP-only cookie; the password and session secret stay in the backend environment.

## API

- `GET /api/health`
- `GET /api/blogs` and `GET /api/blogs/:slug` for published content
- `POST /api/admin/login`, `GET /api/admin/session`, and `POST /api/admin/logout`
- `GET /api/admin/blogs`, `POST /api/admin/blogs`, `PUT /api/admin/blogs/:id`, and `DELETE /api/admin/blogs/:id`

Blog content is stored as plain text and rendered as text by the frontend. Cover images can use a full HTTP(S) URL or a same-site path.
