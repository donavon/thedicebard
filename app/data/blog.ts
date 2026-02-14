import type { ComponentType } from "react";
import { assertIsoDate } from "./blog-types";
import type { BlogFrontmatter } from "./blog-types";
import * as CreateCharacterModule from "../content/blog/create-your-first-character.mdx";
import * as DndResurgenceModule from "../content/blog/dnd-resurgence-stranger-things.mdx";
import * as DndForParentsModule from "../content/blog/dnd-for-parents.mdx";
import * as DiceChecksModule from "../content/blog/dice-checks-and-saves.mdx";
import * as DndJargonModule from "../content/blog/dnd-jargon-glossary.mdx";
import * as SessionZeroModule from "../content/blog/session-zero-basics.mdx";
import dndForParentsImage from "../assets/blog/dnd-for-parents.jpg";
import dndJargonImage from "../assets/blog/dnd-jargon.jpg";
import strangerThingsImage from "../assets/blog/stranger-things.webp";

type BlogPost = BlogFrontmatter & {
  slug: string;
  Component: ComponentType<{ components?: Record<string, unknown> }>;
};

function getFrontmatter(module: { frontmatter?: unknown }) {
  const frontmatter = module.frontmatter;
  if (!frontmatter) {
    throw new Error("Missing blog frontmatter");
  }

  function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }

  if (!isRecord(frontmatter)) {
    throw new Error("Invalid blog frontmatter");
  }

  function getRequiredString(
    value: Record<string, unknown>,
    key: string,
    fieldName: string
  ): string {
    if (!(key in value) || typeof value[key] !== "string") {
      throw new Error(`Invalid blog frontmatter field '${fieldName}'`);
    }

    return value[key];
  }

  function getOptionalString(
    value: Record<string, unknown>,
    key: string,
    fieldName: string
  ): string | undefined {
    if (!(key in value)) {
      return undefined;
    }

    const fieldValue = value[key];
    if (typeof fieldValue === "undefined") {
      return undefined;
    }
    if (typeof fieldValue !== "string") {
      throw new Error(`Invalid blog frontmatter field '${fieldName}'`);
    }
    return fieldValue;
  }

  const title = getRequiredString(frontmatter, "title", "title");
  const synopsis = getRequiredString(frontmatter, "synopsis", "synopsis");
  const author = getRequiredString(frontmatter, "author", "author");
  const publishedDate = getRequiredString(
    frontmatter,
    "publishedDate",
    "publishedDate"
  );
  const imageUrl = getRequiredString(frontmatter, "imageUrl", "imageUrl");
  const imageAlt = getRequiredString(frontmatter, "imageAlt", "imageAlt");
  const imageCreditName = getRequiredString(
    frontmatter,
    "imageCreditName",
    "imageCreditName"
  );
  const imageCreditUrl = getRequiredString(
    frontmatter,
    "imageCreditUrl",
    "imageCreditUrl"
  );
  const lastModified = getOptionalString(
    frontmatter,
    "lastModified",
    "lastModified"
  );

  return {
    title,
    synopsis,
    author,
    publishedDate: assertIsoDate(publishedDate, "publishedDate"),
    lastModified:
      typeof lastModified === "string"
        ? assertIsoDate(lastModified, "lastModified")
        : undefined,
    imageUrl,
    imageAlt,
    imageCreditName,
    imageCreditUrl,
  };
}

const blogPosts: BlogPost[] = [
  {
    slug: "create-your-first-character",
    ...getFrontmatter(CreateCharacterModule),
    Component: CreateCharacterModule.default,
  },
  {
    slug: "dnd-resurgence-stranger-things",
    ...getFrontmatter(DndResurgenceModule),
    imageUrl: strangerThingsImage,
    imageCreditName: "",
    imageCreditUrl: "",
    Component: DndResurgenceModule.default,
  },
  {
    slug: "dnd-for-parents",
    ...getFrontmatter(DndForParentsModule),
    imageUrl: dndForParentsImage,
    Component: DndForParentsModule.default,
  },
  {
    slug: "dice-checks-and-saves",
    ...getFrontmatter(DiceChecksModule),
    Component: DiceChecksModule.default,
  },
  {
    slug: "dnd-jargon-glossary",
    ...getFrontmatter(DndJargonModule),
    imageUrl: dndJargonImage,
    Component: DndJargonModule.default,
  },
  {
    slug: "session-zero-basics",
    ...getFrontmatter(SessionZeroModule),
    Component: SessionZeroModule.default,
  },
].sort(
  (a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
);

function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

function getBlogPostLastmod(
  post: Pick<BlogPost, "publishedDate" | "lastModified">
) {
  const { publishedDate, lastModified = publishedDate } = post;
  return lastModified;
}

export { blogPosts, getBlogPostBySlug, getBlogPostLastmod };
