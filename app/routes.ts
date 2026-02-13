import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("robots.txt", "routes/robots.txt.ts"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
  route(".well-known/*", "routes/well-known.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog-post.tsx"),
  route(":town", "routes/town.tsx"),
  route(":town/:section", "routes/town-section.tsx"),
] satisfies RouteConfig;
