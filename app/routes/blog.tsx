import { Link } from "react-router";
import { blogPosts } from "../data/blog";
import { siteName, siteUrl } from "../data/site";

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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
          {blogPosts.map((post) => (
            <article key={post.slug} className="md:h-130">
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink-blue/10 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 gap-3">
                  <p className="text-sm uppercase tracking-wide text-ink-blue/60">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="text-2xl font-serif font-bold text-dragon-red">
                    {post.title}
                  </h2>
                  <p className="text-ink-blue/75">{post.synopsis}</p>
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
