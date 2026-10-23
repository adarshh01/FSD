# Viva questions and concise answers
1. **What is EcoTrack?** A platform to trace environmental obligations through owners, actions, evidence, review, corrective action, and closeout.
2. **What problem does it solve?** Fragmented records and poor visibility into deadlines and evidence.
3. **Why full stack?** The frontend provides workflows, the API enforces rules, and MongoDB persists records.
4. **Why React?** Reusable UI components and a responsive single-page app.
5. **Why TypeScript?** Static type checking for UI and API-facing code.
6. **Why Express?** A modular Node.js HTTP API framework.
7. **Why MongoDB?** Relational constraints, transactions, indexes, and durable persistence.
8. **Why Mongoose?** Typed database access and schema management.
9. **What is an ORM?** A layer mapping application objects to database operations.
10. **What is RBAC?** Role-based access control.
11. **Why project membership too?** A role should not automatically grant access to every project.
12. **How are passwords stored?** Argon2 hashes, never plaintext.
13. **Why HttpOnly cookies?** JavaScript cannot read the session cookie; CSRF still needs careful handling.
14. **What is a migration?** A versioned schema change applied consistently.
15. **What is referential integrity?** Foreign keys/constraints prevent invalid links and orphan records.
16. **How is risk calculated?** Severity (1–5) × likelihood (1–5), yielding 1–25.
17. **Is that a regulatory determination?** No, it is an internal prioritization aid.
18. **How is overdue determined?** Due date is past and underlying status is not completed.
19. **Why not store files in text columns?** File bytes belong in storage; the database stores metadata and a key.
20. **How are file names secured?** Generated UUID storage names; original name only used as a download label.
21. **What is an audit trail?** Timestamped records of important changes and actors.
22. **How are dashboard numbers calculated?** Database aggregate queries, not hardcoded values.
23. **What is notification idempotency?** A unique deduplication key prevents duplicate reminders for the same event.
24. **Why CSV and PDF?** CSV supports analysis; PDF supports readable sharing.
25. **How is CSV formula injection reduced?** Formula-triggering leading characters are prefixed before CSV quoting.
26. **What is REST?** A resource-oriented HTTP interface using methods such as GET, POST, PATCH, DELETE.
27. **401 vs 403?** 401 means missing/invalid authentication; 403 means authenticated but unauthorized.
28. **Why transactions?** Related writes commit together and avoid partial updates.
29. **What are future enhancements?** GIS, mobile field capture, IoT, scheduled jobs, object storage, and reviewed AI assistance.
30. **Does EcoTrack grant permits?** No, it tracks records and conditions; it is not an authority.
31. **Current limitations?** Local storage, no email/SMS provider, manual reminder refresh, and pending database-backed verification.
32. **How deploy?** Build both apps, configure secrets and origins, provision MongoDB and run the seed script, use TLS, persistent storage, backups, monitoring, and hardened session/CSRF controls.
