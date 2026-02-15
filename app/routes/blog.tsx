import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import {
  normalizeBlogImageUrl,
  normalizeBlogImageUrlForDpr,
} from "../data/blog-image-url";
import { siteName, siteUrl } from "../data/site";

const lineClampThree = {
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  display: "-webkit-box",
  overflow: "hidden",
} as const;

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type BlogIndexLoaderData = {
  posts: Array<{
    author: string;
    imageAlt: string;
    imageUrl: string;
    publishedDate: string;
    slug: string;
    synopsis: string;
    title: string;
  }>;
};

export async function loader(_args: LoaderFunctionArgs) {
  const { getValidatedBlogPosts } = await import("../data/blog.server");
  return {
    posts: getValidatedBlogPosts(),
  } satisfies BlogIndexLoaderData;
}

export function meta() {
  return [
    { title: `Blog | ${siteName}` },
    {
      name: "description",
      content:
        "Beginner-friendly D&D guides, tips, and storytelling advice from The Dice Bard.",
    },
    { property: "og:title", content: `Blog | ${siteName}` },
    { property: "og:url", content: `${siteUrl}/blog` },
  ];
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <section className="bg-parchment px-4 pb-24 pt-24 text-ink-blue">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex justify-center mb-6">
          <span className="h-1 w-24 bg-dragon-red/50 rounded-full"></span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-10 text-dragon-red drop-shadow-sm">
          The Dice Bard Blog
        </h1>
        <p className="mx-auto max-w-2xl text-center text-lg text-ink-blue/80 mb-12 text-balance">
          Practical D&amp;D fundamentals, parent-friendly tips, and short guides
          to help new adventurers start strong.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="md:min-h-130">
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink-blue/10 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full shrink-0 overflow-hidden rounded-t-2xl aspect-[357/192]">
                  <picture className="absolute inset-0 block h-full w-full">
                    <source
                      media="(min-width: 768px)"
                      srcSet={`${normalizeBlogImageUrlForDpr(
                        post.imageUrl,
                        "cardDesktop",
                        1
                      )} 1x, ${normalizeBlogImageUrlForDpr(
                        post.imageUrl,
                        "cardDesktop",
                        2
                      )} 2x`}
                    />
                    <img
                      src={normalizeBlogImageUrl(post.imageUrl, "cardMobile")}
                      srcSet={`${normalizeBlogImageUrlForDpr(
                        post.imageUrl,
                        "cardMobile",
                        1
                      )} 1x, ${normalizeBlogImageUrlForDpr(
                        post.imageUrl,
                        "cardMobile",
                        2
                      )} 2x`}
                      alt={post.imageAlt}
                      className="absolute inset-0 block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <div className="flex flex-1 flex-col p-6 gap-3">
                  <p className="text-sm uppercase tracking-wide text-ink-blue/60">
                    {formatDate(post.publishedDate)}
                  </p>
                  <h2
                    className="text-2xl lg:text-xl xl:text-2xl leading-tight lg:leading-snug xl:leading-tight font-serif font-bold text-dragon-red"
                    style={lineClampThree}
                  >
                    {post.title}
                  </h2>
                  <p className="text-ink-blue/75" style={lineClampThree}>
                    {post.synopsis}
                  </p>
                  <div className="mt-auto flex flex-col gap-1">
                    <p className="text-sm font-semibold text-ink-blue/70">
                      By {post.author}
                    </p>
                    <span className="inline-flex items-center text-dragon-red font-bold group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
