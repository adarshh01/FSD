# EcoTrack — Environmental Compliance Management Platform

## Abstract
Infrastructure projects generate commitments through assessments, approvals, mitigation plans, monitoring, and inspections. Fragmented records make it difficult to track owners, deadlines, evidence, reviews, and corrective actions. EcoTrack is a web-based management platform that connects those records in a traceable workspace. It uses React, TypeScript, Express, Mongoose, and MongoDB, with role-based access, project-level authorization, document metadata, reminders, audit history, and report exports. Sample data is illustrative and does not represent official approvals or legal certification.

## 1. Introduction and background
Environmental compliance is continuous throughout a project's lifecycle. Teams need to connect assessment and approval commitments to owners, dates, actions, evidence, inspection findings, review, and closeout.

## 2. Problem statement
Spreadsheets, email threads, shared folders, inspection tools, and GIS exports fragment compliance records, making overdue actions and evidence trails difficult to track.

## 3. Existing system and limitations
Disconnected registers can duplicate data, present inconsistent statuses, and make historical decisions difficult to reconstruct.

## 4. Proposed system
EcoTrack centralizes projects, assessments/findings, approvals/conditions, compliance obligations, mitigation, inspections, evidence, notifications, reports, and audit history. It is a management tool, not a regulator or compliance certifier.

## 5. Objectives and scope
- Centralize environmental records.
- Assign owners and deadlines.
- Link requirements to actions and evidence.
- Record review and corrective action.
- Surface overdue work and upcoming dates.
- Export compliance data and preserve significant changes.

## 6. Technology stack
React/Vite/TypeScript; Express/Node.js/TypeScript; MongoDB/Mongoose; Argon2; Zod; Multer; PDFKit; Vitest and React Testing Library.

## 7. Architecture
Three tiers: browser presentation, Express application API, and MongoDB data layer with a controlled local storage adapter. See `architecture.md`.

## 8. Database design
Normalized entities cover users, projects/memberships, assessments/findings, approvals/conditions, compliance requirements, mitigation, inspections/findings, documents, reviews, comments, notifications, and audit events.

## 9. Module descriptions
Database-derived dashboard; project management; assessments and risk scoring; approval/condition tracking; mitigation; compliance review; inspections; evidence uploads; reminder center; CSV/PDF reports; audit history.

## 10. Implementation details
Versioned REST endpoints, short-lived signed HttpOnly cookie, Argon2 password hashes, project-level authorization, Zod input validation, generated storage names, metadata/checksum records, and transaction-backed audit events for selected operations.

## 11. Testing methodology and actual results
See `test-plan.md`. The authoring environment lacked Docker and `psql`, and dependency installation did not finish within the command time limit. No database or end-to-end test pass is claimed. Fill this section with actual results after execution.

## 12. Screenshots
Capture screenshots from the running application after setup. Do not use mock screenshots as proof of execution.

## 13. Security considerations
Password hashing, login rate limiting, HttpOnly/SameSite cookies, CORS origin restriction, security headers, input validation, role/project checks, generated filenames, upload size/type limits, and permission-aware downloads are included. Production still needs a hardened CSRF strategy, session revocation/refresh, file-signature checks, malware scanning, secret rotation, backups, and external audit retention.

## 14. Limitations
Local file storage; no configured email/SMS provider; reminders are refreshed through an API rather than a background worker; OpenAPI needs fuller schemas; database-backed execution remains to be verified in a MongoDB environment.

## 15. Future enhancements
GIS, mobile/offline field capture, IoT monitoring, scheduled jobs, email/SMS, object storage, immutable audit service, stronger condition conversion workflow, and human-reviewed AI-assisted document extraction.

## 16. References
- React: https://react.dev/
- Vite: https://vite.dev/
- TypeScript: https://www.typescriptlang.org/docs/
- Express: https://expressjs.com/
- Mongoose: https://mongoosejs.com/docs
- MongoDB: https://www.mongodb.com/docs/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
