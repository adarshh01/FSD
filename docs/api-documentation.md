# API quick reference

Base path: `/api/v1`. JSON errors use `{ "error": "message" }`. Dates use ISO 8601. Login sets an HttpOnly session cookie.

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | API and database status |
| POST | `/auth/register` | Create an account (default role: Project Manager); sets an HttpOnly session cookie |
| POST | `/auth/login` | Sign in with email/password |
| POST | `/auth/logout` | Clear session |
| GET | `/auth/me` | Current user |
| GET, POST | `/users` | Administrator-only user list/create |
| PATCH, DELETE | `/users/:id` | Administrator-only user update/delete; last admin and project ownership protections apply |
| GET, POST | `/projects` | List/create projects |
| GET, PATCH, DELETE | `/projects/:id` | Read/update/archive project |
| GET | `/projects/:id/available-members` | List users available to the project owner/admin |
| PATCH | `/projects/:id/members` | Assign project team members |
| GET, PATCH, DELETE | `/projects/:id` | Read/update/archive project |
| GET, POST | `/assessments` | List/create assessments |
| PATCH, DELETE | `/assessments/:id` | Update/delete an assessment |
| GET, POST | `/approvals` | List/create approval records |
| PATCH, DELETE | `/approvals/:id` | Update/delete an approval record (decisions require approver/admin) |
| GET, POST | `/mitigation` | List/create mitigation actions |
| PATCH, DELETE | `/mitigation/:id` | Update/delete a mitigation action |
| GET, POST | `/compliance` | List/create compliance obligations |
| PATCH, DELETE | `/compliance/:id` | Update/delete a compliance obligation |
| PATCH | `/compliance/:id/status` | Change status and record verification |
| GET, POST | `/inspections` | List/create inspections |
| PATCH, DELETE | `/inspections/:id` | Update/delete an inspection |
| GET, POST | `/documents` | List/upload documents |
| DELETE | `/documents/:id` | Delete document metadata and stored file |
| GET | `/documents/:id/download` | Authorized download |
| GET | `/dashboard` | Aggregated metrics and recent activity |
| GET | `/notifications` | User notification list |
| POST | `/notifications/refresh` | Idempotent reminder generation |
| PATCH | `/notifications/:id/read` | Mark notification read |
| GET | `/audit` | Authorized audit history |
| GET | `/reports/compliance.csv` | CSV export |
| GET | `/reports/compliance.pdf` | PDF export |
| GET | `/openapi.json` | OpenAPI document |

Public registration requires a valid email and a password of at least 10 characters containing uppercase, lowercase, numeric, and symbol characters. Email addresses are normalized and duplicate accounts are rejected. Passwords are Argon2-hashed and never returned by the API. New self-registered accounts receive the `PROJECT_MANAGER` role; public requests cannot select a privileged role. Protected routes require authentication. User administration is restricted to administrators; project team membership can be changed only by an administrator or project owner. Approval status decisions require an administrator or approver. Writes are role-limited; all record reads and writes must pass project membership checks. A duplicate project code or email returns HTTP 409; invalid fields return HTTP 400; unauthenticated calls return 401; forbidden scope returns 403.
