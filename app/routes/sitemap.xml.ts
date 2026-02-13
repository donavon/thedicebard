import type { LoaderFunctionArgs } from "react-router";
import { buildTime } from "../data/build-time";
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
  const lastmod = buildTime
    ? new Date(buildTime).toISOString().slice(0, 10)
    : undefined;
  const townUrls = townPages.map((town) => ({
    loc: `${origin}/${town.slug}`,
    lastmod,
  }));

  const staticUrls: SitemapUrl[] = [
    { loc: `${origin}/${defaultTown.slug}/privacy`, lastmod },
    { loc: `${origin}/${defaultTown.slug}/terms`, lastmod },
  ];

  const body = buildSitemapXml([...townUrls, ...staticUrls]);

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
