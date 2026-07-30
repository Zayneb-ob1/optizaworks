# Optizaworks

Next.js 15 agency website with a Drizzle ORM backend, local SQLite database, secure admin CMS, and persistent contact inbox.

## Project structure

```text
app/                    Next.js routes and thin API adapters
components/             Public and admin React UI
backend/
  admin/                CMS server actions and read queries
  auth/                 Password and session services
  contact/              Contact validation, rate limiting, and persistence
  content/              Published-content database queries
  db/                   Drizzle client, schema, seed, and migrations
  i18n/                 Request-language resolution
shared/
  admin/                Admin form definitions and shared types
  contact/              Contact API contract
  content/              Typed starter content and public DTOs
  i18n/                 Locale configuration and content translations
public/                 Runtime images and logos only
```

Backend modules are server-only. Files under `app/api` only adapt HTTP requests to backend services, while UI code remains under `app` and `components`.

## Local setup

```powershell
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run db:setup
npm.cmd run dev
```

Open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- Drizzle Studio: `npm.cmd run db:studio`

Before `db:setup`, replace `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `CONTACT_RATE_LIMIT_SALT` in `.env.local`. The password must contain at least 12 characters. Running `db:seed` again refreshes the configured admin credentials while preserving content already initialized in the database.

## Database commands

```powershell
npm.cmd run db:generate  # generate SQL after schema changes
npm.cmd run db:migrate   # apply committed migrations
npm.cmd run db:seed      # seed first admin and starter content
npm.cmd run db:setup     # migrate and seed
```

The local database is stored at `data/optizaworks.db`. Database files and WAL files are ignored by Git; SQL migrations live under `backend/db/migrations/`.

## Admin capabilities

- Projects and portfolio case studies
- Organizations, logos, and official links
- Services and carousel content
- CONEKE products
- News
- FAQs
- Contact messages, statuses, and private notes
- Draft/published state, featured state, and sort order

Authentication uses scrypt password hashes and opaque database-backed sessions. Session cookies are HTTP-only, SameSite Strict, and Secure in production. Login attempts and contact submissions are rate-limited.

## Content assets

Admin image fields accept paths to files already available under `public`, such as `/partners/example.png`. Runtime uploads are intentionally not written into the Next.js build directory. Use S3, Cloudinary, or another object-storage adapter for production uploads.

## Deployment

SQLite is suitable for local development and a single Node.js server with persistent disk. It is not suitable for ephemeral serverless filesystems or multiple app instances. For Vercel or horizontal scaling, keep the Drizzle schema and replace the database driver with PostgreSQL or Turso/libSQL.

Always run before deployment:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```
