import type { LoaderFunctionArgs } from "react-router";
import {
  getValidatedBlogPostLastmod,
  getValidatedBlogPosts,
} from "~/utils/blog.server";
import { toRssPubDate } from "~/utils/feed";
import { siteDescription, siteName } from "~/data/site";
import { renderXmlDocument, xml } from "~/utils/xml";

export function loader({ request }: LoaderFunctionArgs) {
  const origin = new URL(request.url).origin;
  const posts = getValidatedBlogPosts();
  const postsByUpdatedDate = [...posts].sort((a, b) => {
    const aLastmod = getValidatedBlogPostLastmod(a);
    const bLastmod = getValidatedBlogPostLastmod(b);
    return bLastmod.localeCompare(aLastmod);
  });

  const latestLastmod =
    postsByUpdatedDate.length > 0
      ? getValidatedBlogPostLastmod(postsByUpdatedDate[0])
      : new Date().toISOString().slice(0, 10);

  const items = postsByUpdatedDate.map((post) => {
    const postUrl = `${origin}/blog/${post.slug}`;
    return xml("item", undefined, [
      xml("title", undefined, [post.title]),
      xml("link", undefined, [postUrl]),
      xml("guid", { isPermaLink: "true" }, [postUrl]),
      xml("description", undefined, [post.synopsis]),
      xml("pubDate", undefined, [toRssPubDate(post.publishedDate)]),
      xml("author", undefined, [post.author]),
    ]);
  });

  const body = renderXmlDocument(
    xml(
      "rss",
      {
        version: "2.0",
        "xmlns:atom": "http://www.w3.org/2005/Atom",
      },
      [
        xml("channel", undefined, [
          xml("title", undefined, [`${siteName} Blog`]),
          xml("link", undefined, [`${origin}/blog`]),
          xml("description", undefined, [siteDescription]),
          xml("language", undefined, ["en-us"]),
          xml("atom:link", {
            href: `${origin}/rss.xml`,
            rel: "self",
            type: "application/rss+xml",
          }),
          xml("lastBuildDate", undefined, [toRssPubDate(latestLastmod)]),
          ...items,
        ]),
      ]
    )
  );

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
