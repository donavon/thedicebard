import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route(":town", "routes/town.tsx"),
  route(":town/:section", "routes/town-section.tsx"),
] satisfies RouteConfig;
