import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { BlogPostJsonLd } from "../components/blog-post-json-ld";
import { BlogCta } from "../components/blog-cta";
import { blogMdxComponents } from "../components/blog-mdx";
import { getBlogContentComponentBySlug } from "../data/blog-content";
import {
  getBlogImageSourceUrl,
  normalizeBlogImageUrl,
} from "../data/blog-image-url";
import { siteName, siteUrl } from "../data/site";

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type BlogPostLoaderData = {
  post: {
    author: string;
    imageAlt: string;
    imageCreditName: string;
    imageSourceUrl: string;
    imageUrl: string;
    lastModified?: string;
    publishedDate: string;
    slug: string;
    synopsis: string;
    title: string;
  };
  relatedPosts: Array<{
    slug: string;
    title: string;
  }>;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? "";
  const { getValidatedBlogPostBySlug, getValidatedBlogPosts } =
    await import("../data/blog.server");
  const post = getValidatedBlogPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const normalizedPost = {
    ...post,
    imageSourceUrl: getBlogImageSourceUrl(post.imageUrl),
    imageUrl: normalizeBlogImageUrl(post.imageUrl, "post"),
  };

  return {
    post: normalizedPost,
    relatedPosts: getValidatedBlogPosts()
      .filter((item) => item.slug !== post.slug)
      .map((item) => ({ slug: item.slug, title: item.title })),
  } satisfies BlogPostLoaderData;
}

export function meta({
  data,
  matches,
}: {
  data: BlogPostLoaderData | undefined;
  matches: Array<{ id: string; data?: unknown }> | undefined;
}) {
  const rootMatch = matches?.find((match) => match.id === "root");
  const rootMatchData = rootMatch?.data;
  const origin =
    typeof rootMatchData === "object" &&
    rootMatchData !== null &&
    "origin" in rootMatchData &&
    typeof rootMatchData.origin === "string"
      ? rootMatchData.origin
      : siteUrl;
  const post = data?.post;

  if (!post) {
    return [
      { title: `Blog | ${siteName}` },
      { name: "robots", content: "noindex" },
    ];
  }

  const ogImageUrl = `${origin}/api/blog/${post.slug}`;

  return [
    { title: `${post.title} | ${siteName}` },
    { name: "description", content: post.synopsis },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.synopsis },
    { property: "og:image", content: ogImageUrl },
    { property: "og:url", content: `${origin}/blog/${post.slug}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: ogImageUrl },
  ];
}

export default function BlogPost() {
  const { post, relatedPosts } = useLoaderData<typeof loader>();
  const PostContent = getBlogContentComponentBySlug(post.slug);

  if (!PostContent) {
    throw new Response("Not Found", { status: 404 });
  }

  return (
    <section className="bg-parchment px-4 pb-24 pt-24 text-ink-blue">
      <BlogPostJsonLd post={post} />
      <div className="mx-auto w-full max-w-3xl">
        <Link
          to="/blog"
          className="text-sm font-semibold text-dragon-red hover:underline"
        >
          ← Back to Blog
        </Link>
        <h1 className="mt-4 text-3xl md:text-5xl font-serif font-bold text-dragon-red drop-shadow-sm">
          {post.title}
        </h1>
        <p className="mt-4 text-ink-blue/70">
          By {post.author} ·{" "}
          <time dateTime={post.publishedDate}>
            {formatDate(post.publishedDate)}
          </time>
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-ink-blue/10 shadow-lg aspect-[16/9]">
          <img
            src={post.imageUrl}
            alt={post.imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
        {post.imageCreditName ? (
          <p className="mt-3 text-xs text-ink-blue/60">
            Photo by{" "}
            <a
              href={post.imageSourceUrl}
              className="underline hover:text-ink-blue"
              rel="noreferrer"
              target="_blank"
            >
              {post.imageCreditName}
            </a>
          </p>
        ) : null}

        <article className="mt-8">
          <PostContent components={blogMdxComponents} />
        </article>

        <BlogCta variant="closing" />
        <div className="mt-12 border-t border-ink-blue/10 pt-8">
          <h2 className="text-2xl font-serif font-bold text-ink-blue">
            More from the Blog
          </h2>
          <div className="mt-4 space-y-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="block text-dragon-red font-semibold hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
