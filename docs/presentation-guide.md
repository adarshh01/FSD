# Five-to-seven-minute demo script

**0:00–0:40 — Problem.** Infrastructure projects generate commitments through assessments, approvals, mitigation, inspections, and monitoring. Fragmented spreadsheets and folders make deadlines and evidence hard to trace. EcoTrack connects those records.

**0:40–1:20 — Dashboard.** Sign in as `manager@ecotrack.local`. Show project counts, obligations, overdue actions, verified obligations, category calculations, risk classifications, inspections, and activity. Explain that values come from MongoDB and sample records are illustrative.

**1:20–2:10 — Projects.** Open Highway Expansion Project. Explain project code, owner, location, risk, and counts for related records.

**2:10–3:10 — Traceability.** Open Compliance Register. Follow a requirement to its source reference and linked mitigation action. Explain: Commitment → Owner + Deadline → Action → Field Evidence → Review → Corrective Action → Closeout.

**3:10–4:00 — Mitigation and inspections.** Show due dates, underlying workflow status, computed overdue flag, and scheduled inspections.

**4:00–4:45 — Evidence.** Show Documents. File bytes are stored locally; MongoDB holds metadata, checksum, uploader, project, and storage key. Upload/download requires project access.

**4:45–5:30 — Reports and audit.** Export CSV and PDF. Open audit history and show actor, action, entity, timestamp, and summary.

**5:30–6:15 — Architecture/security.** Explain React → Express → Mongoose → MongoDB; mention Argon2, HttpOnly cookie, role/project authorization, validation, and safe file naming.

**6:15–6:45 — Limitations.** Approval tracking is not permit issuance. Sample data is illustrative. Email/SMS, GIS, IoT, and AI are future enhancements unless separately implemented. State actual build/test results from the demo machine.

## Before the demo
Run migrations and seed, check login, dashboard, project detail, exports, and upload/download. Keep a database backup. Never claim a check passed unless executed.
