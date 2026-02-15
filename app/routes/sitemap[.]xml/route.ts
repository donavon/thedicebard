import type { LoaderFunctionArgs } from "react-router";
import {
  getValidatedBlogPostLastmod,
  getValidatedBlogPosts,
} from "~/utils/blog.server";
import { buildTime } from "~/data/build-time";
import { defaultTown, townPages } from "~/data/towns";
import { formatIsoDateTimeInSiteTimeZone } from "~/utils/site-time";
import { renderXmlDocument, xml } from "~/utils/xml";

type SitemapUrl = {
  loc: string;
  lastmod?: string;
};

function buildSitemapXml(urls: SitemapUrl[]) {
  const urlNodes = urls.map((entry) =>
    xml("url", undefined, [
      xml("loc", undefined, [entry.loc]),
      entry.lastmod ? xml("lastmod", undefined, [entry.lastmod]) : undefined,
    ])
  );

  return renderXmlDocument(
    xml(
      "urlset",
      {
        xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
      },
      urlNodes
    )
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  const origin = new URL(request.url).origin;
  const nonBlogLastmod = formatIsoDateTimeInSiteTimeZone(buildTime);
  const blogPosts = getValidatedBlogPosts();
  const townUrls = townPages.map((town) => ({
    loc: `${origin}/${town.slug}`,
    lastmod: nonBlogLastmod,
  }));

  const blogPostLastmods = blogPosts.map((post) =>
    getValidatedBlogPostLastmod(post)
  );
  const blogIndexLastmod =
    blogPostLastmods.length > 0 ? blogPostLastmods.sort().at(-1) : undefined;

  const staticUrls: SitemapUrl[] = [
    { loc: `${origin}/${defaultTown.slug}/privacy`, lastmod: nonBlogLastmod },
    { loc: `${origin}/${defaultTown.slug}/terms`, lastmod: nonBlogLastmod },
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
