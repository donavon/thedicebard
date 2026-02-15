import { getBlogFileSlugFromPath, getBlogMdxModules } from "./blog-modules";

type BlogFrontmatterModule = { frontmatter?: unknown };

type RawBlogPost = {
  fileSlug: string;
  frontmatter: unknown;
};

const blogModules = getBlogMdxModules<BlogFrontmatterModule>();

const rawBlogPosts: RawBlogPost[] = Object.entries(blogModules).map(
  ([pathname, module]) => ({
    fileSlug: getBlogFileSlugFromPath(pathname),
    frontmatter: module.frontmatter,
  })
);

export { rawBlogPosts };
export type { RawBlogPost };
