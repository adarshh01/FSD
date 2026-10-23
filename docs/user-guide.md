# EcoTrack user guide

## Create an account or sign in
Open the web app at `http://localhost:5173`. Select **Create an account** on the sign-in page, then enter your name, email, and a strong password. Registration saves a new user to MongoDB and signs the user in using an HttpOnly cookie. Email addresses are normalized and duplicate emails are rejected. Self-registered users receive the Project Manager role so they can create their own projects; they cannot register as administrators. Existing users can sign in with their email and password.

For the preloaded academic demo, use one of the demo accounts listed in the root README. All demo accounts use `EcoTrackDemo!2026` after seeding. The seed command now leaves non-empty databases untouched unless you deliberately pass `--reset`; never use reset mode for data you want to preserve.

## Dashboard and projects
The dashboard is based on current database records. Open Projects to search and filter the workspace, create, edit, and archive projects (manager/admin roles), and open a project detail page to inspect linked-record totals and manage team membership as the owner or an administrator. Archiving preserves project history.

## Environmental records
Assessments record impact categories, findings, and review state. Approval records track reference information, conditions, and expiry dates; EcoTrack does not issue approvals. Mitigation actions track ownership, priorities, status, and deadlines. Compliance obligations must be explicitly reviewed; a completed task is not automatically legal compliance. Inspections record environmental checks and findings.

## Evidence
Open Documents to upload PDF, JPEG, PNG, TXT, DOCX, or XLSX files up to 10 MB. Files are stored under `UPLOAD_DIR`; the database stores metadata and generated storage names. Download access is project-scoped.

## Notifications and reports
Use Refresh reminders in Notifications to generate idempotent reminders for due actions, approvals, inspections, and obligations. Reports offers CSV and PDF compliance-register exports. Audit history records significant application actions.

## Roles
- Administrator: system-wide visibility and user administration.
- Project Manager: project and record management for authorized projects.
- Environmental Officer: environmental records, evidence, and status updates for authorized projects.
- Approver: review approval records and make approval decisions for authorized projects.
- Auditor / Viewer: read-only project access.

Seeded records and measurements are illustrative academic data, not official environmental determinations.
