import type { LoaderFunctionArgs } from "react-router";
import {
  getValidatedBlogPostLastmod,
  getValidatedBlogPosts,
} from "../data/blog.server";
import { defaultTown, townPages } from "../data/towns";

type SitemapUrl = {
  loc: string;
  lastmod?: string;
};

function buildSitemapXml(urls: SitemapUrl[]) {
  const entries = urls
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `<lastmod>${entry.lastmod}</lastmod>`
        : "";
      return `<url><loc>${entry.loc}</loc>${lastmod}</url>`;
    })
    .join("");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries +
    `</urlset>`
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  const origin = new URL(request.url).origin;
  const blogPosts = getValidatedBlogPosts();
  const townUrls = townPages.map((town) => ({
    loc: `${origin}/${town.slug}`,
  }));

  const blogPostLastmods = blogPosts.map((post) =>
    getValidatedBlogPostLastmod(post)
  );
  const blogIndexLastmod =
    blogPostLastmods.length > 0 ? blogPostLastmods.sort().at(-1) : undefined;

  const staticUrls: SitemapUrl[] = [
    { loc: `${origin}/${defaultTown.slug}/privacy` },
    { loc: `${origin}/${defaultTown.slug}/terms` },
    { loc: `${origin}/blog`, lastmod: blogIndexLastmod },
  ];

  const blogUrls = blogPosts.map((post) => ({
    loc: `${origin}/blog/${post.slug}`,
    lastmod: getValidatedBlogPostLastmod(post),
  }));

  const body = buildSitemapXml([...townUrls, ...staticUrls, ...blogUrls]);

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
