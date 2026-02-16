import { defaultTown, townPages } from "~/data/towns";

function normalizeSlug(value: string) {
  return value.toLowerCase();
}

export function getTownSlugFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[0] ? normalizeSlug(segments[0]) : "home";
  const knownSlugs = new Set(townPages.map((town) => town.slug));
  return knownSlugs.has(slug) ? slug : "home";
}

export function getTownBySlug(slug: string) {
  const normalized = normalizeSlug(slug);
  return townPages.find((town) => town.slug === normalized) ?? defaultTown;
}

export function isValidTownSlug(slug: string) {
  const normalized = normalizeSlug(slug);
  return townPages.some((town) => town.slug === normalized);
}
