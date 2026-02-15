import { getBlogFileSlugFromPath, getBlogMdxModules } from "./blog-modules";

type BlogFrontmatterModule = { frontmatter?: unknown };

export type RawBlogPost = {
  fileSlug: string;
  frontmatter: unknown;
};

const blogModules = getBlogMdxModules<BlogFrontmatterModule>();

export const rawBlogPosts: RawBlogPost[] = Object.entries(blogModules).map(
  ([pathname, module]) => ({
    fileSlug: getBlogFileSlugFromPath(pathname),
    frontmatter: module.frontmatter,
  })
);
