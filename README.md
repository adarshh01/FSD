# EcoTrack — Environmental Compliance Management Platform

A MERN-stack academic demonstration for tracking environmental assessments, approval records, mitigation actions, compliance obligations, inspections, documents, notifications, and audit activity. All seeded records are illustrative; this system does not issue permits or certify legal compliance.

## Stack
- React + Vite + TypeScript, React Router, TanStack Query, Recharts, Lucide, custom responsive UI
- Node.js + Express + TypeScript REST API
- MongoDB + Mongoose
- Argon2 password hashing, JWT in HttpOnly cookie, role checks, Helmet, CORS, rate limiting, Zod validation
- Multer local file storage, PDFKit and CSV reports

## Requirements
Node.js 20+ and Docker Desktop (recommended) or a MongoDB 7+ instance.

## Run locally
1. Copy `.env.example` to `.env`. Set a unique `JWT_SECRET` of at least 32 characters for any non-demo deployment.
2. Start MongoDB: `docker compose up -d mongodb`.
3. Install dependencies from the repository root: `npm install`.
4. (Optional) Seed demo users and records on an empty database: `npm run db:seed`. The script refuses to overwrite an existing database unless you explicitly pass `--reset`.
5. Start the API and web client: `npm run dev`.

New users can register at `http://localhost:5173/register`. Registration normalizes email addresses, validates strong passwords, hashes passwords with Argon2, stores accounts in MongoDB, and creates an HttpOnly session cookie. New self-registered accounts receive the `PROJECT_MANAGER` role (not administrator privileges) so they can create and manage their own projects. Existing users can sign in at `/login`.
6. Open `http://localhost:5173`.

Demo accounts (all use `EcoTrackDemo!2026`):
- `admin@ecotrack.local` — ADMIN
- `manager@ecotrack.local` — PROJECT_MANAGER
- `officer@ecotrack.local` — ENVIRONMENTAL_OFFICER
- `auditor@ecotrack.local` — AUDITOR (read-only)
- `approver@ecotrack.local` — APPROVER (approval decisions)
- `viewer@ecotrack.local` — VIEWER (read-only)
- All demo accounts use the same demo password listed above.

Seed demo accounts are optional. On a non-empty database the script does not modify data unless you deliberately use reset mode. See Seed safety and persistence below.

## Commands
- `npm run dev` — API + web development servers
- `npm run build` — TypeScript and production builds
- `npm test` — API and frontend tests (MongoDB-backed integration tests are skipped unless `MONGODB_TEST_URI` points to a dedicated database ending in `ecotrack_test`)
- `npm run lint` — lint checks
- `npm run db:seed` — seed illustrative data only when collections are empty
- `npm run db:seed -w apps/api -- --reset` — explicitly replace demo collections (destructive)
- `npm run admin:bootstrap -w apps/api` — promote a registered account to the first administrator when no active administrator exists

## API
Base URL: `http://localhost:4000/api/v1`. Health: `/health`; OpenAPI JSON: `/openapi.json`. Most routes require login. Project-level access is enforced by the API. Core resources are `/projects`, `/assessments`, `/approvals`, `/mitigation`, `/compliance`, `/inspections`, `/documents`, `/notifications`, `/audit`, `/dashboard`, and `/reports/compliance.csv` / `.pdf`.

## Security and limitations
- Passwords are hashed; session JWT is HttpOnly and SameSite=Strict.
- Change `JWT_SECRET` and configure HTTPS before deployment. For cross-site production hosting, add a robust CSRF token strategy and configure cookie/CORS settings for the actual origin.
- Local uploads are stored in `UPLOAD_DIR`; back up it along with MongoDB. Uploads are limited to 10 MB and a fixed MIME allowlist.
- This is an academic demonstration, not a certified compliance product. Sample measurements and seeded dates are illustrative.
- Audit records are application-level append-only records, not an external tamper-proof log.


## Seed safety and persistence

The seed script now refuses to change a database that already contains records. On an empty database, run `npm run db:seed` to insert illustrative academic demo records. To intentionally erase and recreate those demo collections, use `npm run db:seed -w apps/api -- --reset` only after backing up anything you need. Never run reset mode against data you want to preserve.

MongoDB data is stored in the `ecotrack_mongo` Docker volume. Stopping or restarting the container preserves the data; removing the volume deletes it. Uploaded files live under `UPLOAD_DIR` and should be backed up alongside MongoDB.


## Administrator bootstrap

Public registration never grants the administrator role. To create the first administrator safely, register the account normally, then set `BOOTSTRAP_ADMIN_EMAIL` in `.env` to that account's email and run `npm run admin:bootstrap -w apps/api`. The script only promotes the specified existing account if no active administrator exists; otherwise it makes no changes. Sign in again after promotion.
