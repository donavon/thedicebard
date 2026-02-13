import { Link, useParams } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { blogMdxComponents } from "../components/blog-mdx";
import { blogPosts, getBlogPostBySlug } from "../data/blog";
import { siteName, siteUrl } from "../data/site";

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? "";
  const post = getBlogPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return { slug };
}

export function meta({ params }: { params: { slug?: string } }) {
  const slug = params.slug ?? "";
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return [
      { title: `Blog | ${siteName}` },
      { name: "robots", content: "noindex" },
    ];
  }

  return [
    { title: `${post.title} | ${siteName}` },
    { name: "description", content: post.synopsis },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.synopsis },
    { property: "og:image", content: post.imageUrl },
    { property: "og:url", content: `${siteUrl}/blog/${post.slug}` },
  ];
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const PostContent = post.Component;

  return (
    <section className="bg-parchment px-4 pb-24 pt-24 text-ink-blue">
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
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-ink-blue/10 shadow-lg aspect-[16/9]">
          <img
            src={post.imageUrl}
            alt={post.imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-xs text-ink-blue/60">
          Photo by{" "}
          <a
            href={post.imageCreditUrl}
            className="underline hover:text-ink-blue"
            rel="noreferrer"
            target="_blank"
          >
            {post.imageCreditName}
          </a>
        </p>

        <article className="mt-8">
          <PostContent components={blogMdxComponents} />
        </article>

        <div className="mt-12 border-t border-ink-blue/10 pt-8">
          <h2 className="text-2xl font-serif font-bold text-ink-blue">
            More from the Blog
          </h2>
          <div className="mt-4 space-y-3">
            {blogPosts
              .filter((item) => item.slug !== post.slug)
              .map((item) => (
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
