function normalizeSlug(value: string) {
  return value.toLowerCase();
}

function getTownSlugFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[0] ? normalizeSlug(segments[0]) : "home";
  return slug;
}

export { getTownSlugFromPathname };
