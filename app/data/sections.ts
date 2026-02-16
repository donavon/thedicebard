/**
 * Valid section IDs for scroll-to-section routing.
 * These must match the IDs used in section components.
 */
export const SECTION_IDS = [
  "what-is-dnd",
  "services",
  "about",
  "service-area",
  "patrons",
  "booking",
  "faq",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_IDS_SET = new Set<string>(SECTION_IDS);
