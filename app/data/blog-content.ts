import type { ComponentType } from "react";
import { getBlogMdxModules, getBlogSlugFromModule } from "./blog-modules";

type BlogContentComponent = ComponentType<{
  components?: Record<string, unknown>;
}>;
type BlogContentModule = {
  default: BlogContentComponent;
  frontmatter?: unknown;
};
const blogModules = getBlogMdxModules<BlogContentModule>();

const blogContentBySlug: Record<string, BlogContentComponent> = {};

for (const [pathname, module] of Object.entries(blogModules)) {
  blogContentBySlug[getBlogSlugFromModule(module, pathname)] = module.default;
}

function getBlogContentComponentBySlug(slug: string) {
  return blogContentBySlug[slug];
}

export { getBlogContentComponentBySlug };
