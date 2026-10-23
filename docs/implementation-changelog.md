# EcoTrack implementation review and changes

## Scope

This update extends the existing EcoTrack project. It does not replace the MERN architecture or the existing UI. MongoDB/Mongoose remains the persistence layer; React Query refreshes data from the API after mutations.

## Changes made

- Added `APPROVER` and `VIEWER` roles while retaining existing `ADMIN`, `PROJECT_MANAGER`, `ENVIRONMENTAL_OFFICER`, and `AUDITOR` roles.
- Added a session-version field to users. Logout and administrator role/account changes increment it so existing JWT cookies are rejected on the next request.
- Added administrator-only user creation, listing/search, profile/role/status updates, and safe deletion. Passwords are Argon2-hashed; password hashes are excluded from normal user queries and responses. The last active administrator is protected, self-deletion is blocked, and users who own projects must be deactivated or have ownership handled before deletion.
- Added a safe first-administrator bootstrap script. It only promotes an existing account when no active administrator exists.
- Added project-team membership endpoints and a project-detail team management interface. Only an administrator or the project owner can manage members.
- Completed create/edit/delete interfaces for assessments, approvals, mitigation actions, compliance requirements, and inspections. Added project edit/archive controls, user-management controls, and document deletion controls.
- Added form support for assessment/inspection findings, approval conditions, inspection readings, and linking mitigation actions to compliance requirements.
- Added route-specific status validation and approval-decision authorization. A project manager can maintain approval metadata but cannot record an approval decision; an administrator or approver can.
- Added computed overdue status and linked mitigation lists to record API responses. Added dashboard compliance percentages and database-backed overdue counts.
- Fixed notification deduplication keys to include the recipient, and made audit history include the current user's account-level events.
- Fixed project-list filtering so archived projects can be explicitly displayed, and escaped regular-expression metacharacters in administrator user search input.
- Fixed root `.env` loading when commands run from the API workspace and set uploads to the repository-level `uploads` directory by default.
- Made the seed script non-destructive by default. It refuses to modify a non-empty database unless `--reset` is explicitly supplied; reset mode also removes stored files referenced by document records.
- Added integration tests for environmental CRUD persistence, cross-user project isolation, administrator user CRUD, viewer restrictions, and last-admin protection.

## Verification status

- TypeScript/TSX syntax transpilation: passed for the source and test files inspected.
- Package JSON parsing: passed.
- ZIP integrity: passed (`unzip -t` reported no compressed-data errors).
- Full TypeScript builds, lint, and automated tests: **not verified**. Dependency installation timed out because this environment cannot resolve `registry.npmjs.org`; `npm test` stopped because `vitest` was not installed. See `docs/verification-report.md` for exact commands and limitations. Run `npm install`, `npm run build`, `npm run lint`, and `npm test` locally before treating the application as production-ready.
- MongoDB integration tests require `MONGODB_TEST_URI` to point to a dedicated database whose name ends in `ecotrack_test`. They were not run here.

## Safe local setup

1. Copy `.env.example` to `.env` and configure `MONGODB_URI` and a unique `JWT_SECRET`.
2. Start MongoDB with `docker compose up -d mongodb`.
3. Run `npm install` from the repository root.
4. Optionally run `npm run db:seed` only on an empty database to add demo accounts and sample records.
5. Start with `npm run dev`.
6. Use `npm run admin:bootstrap -w apps/api` after setting `BOOTSTRAP_ADMIN_EMAIL` if the database has no active administrator and the specified account already exists.

Do not run seed reset mode against data that needs to be preserved.
