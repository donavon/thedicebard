type BlogMdxModule = Record<string, unknown>;

function getBlogMdxModules<TModule extends BlogMdxModule>() {
  return import.meta.glob<TModule>("../content/blog/*.mdx", { eager: true });
}

function getBlogFileSlugFromPath(pathname: string) {
  const filename = pathname.split("/").at(-1);
  if (!filename) {
    throw new Error(`Invalid blog module path '${pathname}'`);
  }

  return filename.replace(/\.mdx$/, "");
}

function getBlogFrontmatterRecord(
  module: { frontmatter?: unknown },
  pathname: string
) {
  function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }

  if (!module.frontmatter) {
    throw new Error(`Missing blog frontmatter in '${pathname}'`);
  }

  if (!isRecord(module.frontmatter)) {
    throw new Error(`Invalid blog frontmatter in '${pathname}'`);
  }

  return module.frontmatter;
}

function getBlogSlugFromModule(
  module: { frontmatter?: unknown },
  pathname: string
) {
  const frontmatter = getBlogFrontmatterRecord(module, pathname);
  if (typeof frontmatter.slug !== "string" || frontmatter.slug.length === 0) {
    throw new Error(`Missing required blog slug in '${pathname}'`);
  }

  return frontmatter.slug;
}

export {
  getBlogFileSlugFromPath,
  getBlogFrontmatterRecord,
  getBlogMdxModules,
  getBlogSlugFromModule,
};
