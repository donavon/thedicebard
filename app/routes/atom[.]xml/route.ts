import type { LoaderFunctionArgs } from "react-router";
import {
  getValidatedBlogPostLastmod,
  getValidatedBlogPosts,
} from "~/utils/blog.server";
import { toIsoDateTime } from "~/utils/feed";
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

  const entries = postsByUpdatedDate.map((post) => {
    const postUrl = `${origin}/blog/${post.slug}`;
    const updated = toIsoDateTime(getValidatedBlogPostLastmod(post));
    const published = toIsoDateTime(post.publishedDate);

    return xml("entry", undefined, [
      xml("id", undefined, [postUrl]),
      xml("title", { type: "text" }, [post.title]),
      xml("link", { rel: "alternate", type: "text/html", href: postUrl }),
      xml("updated", undefined, [updated]),
      xml("published", undefined, [published]),
      xml("author", undefined, [xml("name", undefined, [post.author])]),
      xml("summary", { type: "text" }, [post.synopsis]),
    ]);
  });

  const body = renderXmlDocument(
    xml("feed", { xmlns: "http://www.w3.org/2005/Atom" }, [
      xml("id", undefined, [`${origin}/blog`]),
      xml("title", { type: "text" }, [`${siteName} Blog`]),
      xml("subtitle", { type: "text" }, [siteDescription]),
      xml("updated", undefined, [toIsoDateTime(latestLastmod)]),
      xml("author", undefined, [xml("name", undefined, [siteName])]),
      xml("link", {
        rel: "self",
        type: "application/atom+xml",
        href: `${origin}/atom.xml`,
      }),
      xml("link", {
        rel: "alternate",
        type: "text/html",
        href: `${origin}/blog`,
      }),
      ...entries,
    ])
  );

  return new Response(body, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
