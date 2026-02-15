import { z } from "zod";
import { rawBlogPosts } from "./blog";
import { getBlogSlugFromModule } from "./blog-modules";

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) {
      return false;
    }

    const [year, month, day] = value.split("-").map((part) => Number(part));
    return (
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() + 1 === month &&
      parsed.getUTCDate() === day
    );
  }, "Expected YYYY-MM-DD");

const blogFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  synopsis: z.string(),
  author: z.string(),
  publishedDate: isoDateSchema,
  lastModified: isoDateSchema.optional(),
  imageUrl: z.string(),
  imageAlt: z.string(),
  imageCreditName: z.string().optional().default(""),
  imageCreditUrl: z.string().optional().default(""),
});

type ValidatedBlogPost = z.infer<typeof blogFrontmatterSchema>;

function getValidatedBlogPost(rawPost: {
  fileSlug: string;
  frontmatter: unknown;
}) {
  const pathname = `../content/blog/${rawPost.fileSlug}.mdx`;
  const slugFromFrontmatter = getBlogSlugFromModule(
    { frontmatter: rawPost.frontmatter },
    pathname
  );
  const slugFromFilename = rawPost.fileSlug;

  if (slugFromFrontmatter !== slugFromFilename) {
    throw new Error(
      `Blog slug mismatch in '${pathname}'. Frontmatter slug '${slugFromFrontmatter}' must match filename slug '${slugFromFilename}'.`
    );
  }

  return blogFrontmatterSchema.parse(rawPost.frontmatter);
}

const validatedBlogPosts: ValidatedBlogPost[] = rawBlogPosts
  .map((rawPost) => getValidatedBlogPost(rawPost))
  .sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

function getValidatedBlogPosts() {
  return validatedBlogPosts;
}

function getValidatedBlogPostBySlug(slug: string) {
  return validatedBlogPosts.find((post) => post.slug === slug);
}

function getValidatedBlogPostLastmod(
  post: Pick<ValidatedBlogPost, "publishedDate" | "lastModified">
) {
  return post.lastModified ?? post.publishedDate;
}

export {
  getValidatedBlogPostBySlug,
  getValidatedBlogPostLastmod,
  getValidatedBlogPosts,
};
export type { ValidatedBlogPost };
