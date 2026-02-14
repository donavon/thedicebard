import type { ComponentType } from "react";
import * as CreateCharacterModule from "../content/blog/create-your-first-character.mdx";
import * as DndResurgenceModule from "../content/blog/dnd-resurgence-stranger-things.mdx";
import * as DndForParentsModule from "../content/blog/dnd-for-parents.mdx";
import * as DiceChecksModule from "../content/blog/dice-checks-and-saves.mdx";
import * as DndJargonModule from "../content/blog/dnd-jargon-glossary.mdx";
import * as SessionZeroModule from "../content/blog/session-zero-basics.mdx";
import dndForParentsImage from "../assets/blog/dnd-for-parents.jpg";
import dndJargonImage from "../assets/blog/dnd-jargon.jpg";
import strangerThingsImage from "../assets/blog/stranger-things.webp";

type BlogFrontmatter = {
  title: string;
  synopsis: string;
  author: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  imageCreditName: string;
  imageCreditUrl: string;
};

type BlogPost = BlogFrontmatter & {
  slug: string;
  Component: ComponentType<{ components?: Record<string, unknown> }>;
};

function getFrontmatter(module: { frontmatter?: Record<string, unknown> }) {
  return module.frontmatter as BlogFrontmatter;
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
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export { blogPosts, getBlogPostBySlug };
