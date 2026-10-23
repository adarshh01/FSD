# EcoTrack verification report

Date: 2026-10-14

## Checks completed in this environment

- ZIP archive integrity: passed before extraction (`unzip -t`).
- TypeScript/TSX syntax transpilation: passed for 14 source and test files using the globally available TypeScript transpiler. This is a syntax check, not a full type check or production build.
- JSON configuration parsing: passed for the root, API, web, and shared package manifests and TypeScript configurations.
- Static implementation checks: passed for registration/login/logout/session restoration endpoints, hidden password hashes, user CRUD endpoints, project CRUD/archive endpoints, generated CRUD endpoints for environmental entities, safe seed behavior, archived-project filtering, and escaped administrator search input.
- Added two small correctness fixes during this pass: archived projects can be explicitly filtered in the Projects list, and user search escapes regex metacharacters rather than interpreting search text as a regular expression.

## Checks blocked

The full build, lint, and automated test suite could not be completed because dependencies are not installed and this environment cannot resolve `registry.npmjs.org` (`curl` returned a DNS resolution error). `npm install --no-audit --no-fund` timed out; `npm install --offline` failed because the required package metadata is not cached. Therefore:

- `npm run build`: blocked by missing installed packages and their type declarations.
- `npm run test`: blocked because `vitest` is not installed.
- `npm run lint`: blocked because `eslint` is not installed.
- MongoDB integration tests: not run; this environment does not have the Docker CLI or `mongod`/`mongosh` available.

These are environment/dependency blockers, not evidence that the commands pass. Do not treat this report as an end-to-end verification.

## Run the complete checks on the development Mac

From the extracted project root in VS Code terminal:

```bash
npm install
npm run build
npm run lint
npm test
```

Start MongoDB in another terminal (Docker Desktop must be running):

```bash
docker compose up -d mongodb
```

Configure a dedicated integration-test database whose name ends in `ecotrack_test`, then run the API integration suite with `MONGODB_TEST_URI` set to that URI. Never point test cleanup at the normal `ecotrack` development database.

```bash
MONGODB_TEST_URI=mongodb://127.0.0.1:27017/ecotrack_test npm run test -w apps/api
```

After tests pass, manually verify registration, login after browser restart, project and compliance CRUD, logout, and access isolation with two different accounts.
