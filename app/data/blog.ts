import * as CreateCharacterModule from "../content/blog/create-your-first-character.mdx";
import * as DndForParentsModule from "../content/blog/dnd-for-parents.mdx";
import * as DiceChecksModule from "../content/blog/dice-checks-and-saves.mdx";
import * as DndJargonModule from "../content/blog/dnd-jargon-glossary.mdx";
import * as SessionZeroModule from "../content/blog/session-zero-basics.mdx";
import dndForParentsImage from "../assets/blog/dnd-for-parents.jpg";
import dndJargonImage from "../assets/blog/dnd-jargon.jpg";

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
  Component: () => JSX.Element;
};

const blogPosts: BlogPost[] = [
  {
    slug: "create-your-first-character",
    ...(
      CreateCharacterModule as {
        frontmatter: BlogFrontmatter;
      }
    ).frontmatter,
    Component: CreateCharacterModule.default,
  },
  {
    slug: "dnd-for-parents",
    ...(
      DndForParentsModule as {
        frontmatter: BlogFrontmatter;
      }
    ).frontmatter,
    imageUrl: dndForParentsImage,
    Component: DndForParentsModule.default,
  },
  {
    slug: "dice-checks-and-saves",
    ...(
      DiceChecksModule as {
        frontmatter: BlogFrontmatter;
      }
    ).frontmatter,
    Component: DiceChecksModule.default,
  },
  {
    slug: "dnd-jargon-glossary",
    ...(
      DndJargonModule as {
        frontmatter: BlogFrontmatter;
      }
    ).frontmatter,
    imageUrl: dndJargonImage,
    Component: DndJargonModule.default,
  },
  {
    slug: "session-zero-basics",
    ...(
      SessionZeroModule as {
        frontmatter: BlogFrontmatter;
      }
    ).frontmatter,
    Component: SessionZeroModule.default,
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export { blogPosts, getBlogPostBySlug };
