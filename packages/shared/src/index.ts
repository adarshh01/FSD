export const ENVIRONMENTAL_CATEGORIES = ["Air & Dust", "Water", "Noise", "Waste", "Biodiversity", "Land & Soil", "Community"] as const;
export const COMPLIANCE_STATUSES = ["NOT_STARTED", "IN_PROGRESS", "EVIDENCE_SUBMITTED", "UNDER_REVIEW", "VERIFIED", "NON_COMPLIANT", "CORRECTIVE_ACTION_REQUIRED"] as const;
export const PROJECT_STATUSES = ["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "ARCHIVED"] as const;
export type EnvironmentalCategory = typeof ENVIRONMENTAL_CATEGORIES[number];
export type ComplianceStatus = typeof COMPLIANCE_STATUSES[number];
