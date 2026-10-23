# Test plan and verification status

## Automated coverage intended
- API health response (does not require a database connection).
- Frontend rendering and primary UI behavior via Vitest and React Testing Library.
- Extend API integration tests for authentication, project authorization, duplicate codes, CRUD, reminders, document permissions, and report exports before production use.

## Local verification commands
1. `docker compose up -d mongodb`
2. `npm install`
3. (Optional, empty database only) `npm run db:seed`; the script refuses to overwrite existing data unless `--reset` is explicitly supplied.
4. `npm run build`
5. `npm test`
6. `npm run lint`

## Verification note
The authoring environment did not complete `npm install` within the available command execution window, and no `mongod` executable was present. Consequently, dependency installation, MongoDB seeding, build, lint, and full database-backed workflows have not been verified here. Run the commands above in a network-enabled Node.js environment with Docker/MongoDB before submission. Do not report these checks as passing unless they complete successfully.


## Multi-user authentication regression tests

The API includes registration validation tests and opt-in MongoDB integration tests for password hashing, normalized emails, duplicate rejection, login/logout/session checks, and project isolation. To run the integration tests, set `MONGODB_TEST_URI` to a dedicated test database whose name ends with `ecotrack_test`; the suite refuses to run against another database name. Example: `MONGODB_TEST_URI=mongodb://127.0.0.1:27017/ecotrack_test npm test`.
