import { z } from "zod";
import { blogPosts } from "./blog";

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

const blogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  synopsis: z.string(),
  author: z.string(),
  publishedDate: isoDateSchema,
  lastModified: isoDateSchema.optional(),
  imageUrl: z.string(),
  imageAlt: z.string(),
  imageCreditName: z.string(),
  imageCreditUrl: z.string(),
});

type ValidatedBlogPost = z.infer<typeof blogPostSchema>;

function getValidatedBlogPosts() {
  return blogPosts.map((post) => blogPostSchema.parse(post));
}

function getValidatedBlogPostBySlug(slug: string) {
  return getValidatedBlogPosts().find((post) => post.slug === slug);
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
