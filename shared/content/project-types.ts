export const projectTypes = ["web", "software", "branding", "app"] as const;

export type ProjectType = (typeof projectTypes)[number];
