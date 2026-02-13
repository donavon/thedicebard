import { townPages } from "../data/towns";

function normalizeSlug(value: string) {
  return value.toLowerCase();
}

function getTownSlugFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[0] ? normalizeSlug(segments[0]) : "home";
  const knownSlugs = new Set(townPages.map((town) => town.slug));
  return knownSlugs.has(slug) ? slug : "home";
}

export { getTownSlugFromPathname };
