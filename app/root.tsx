import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { GoogleAnalytics } from "./components/google-analytics";
import { JsonLd } from "./components/json-ld";
import ogImage from "./assets/images/og-image.png";
import {
  defaultTitle,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "./data/site";

const title = defaultTitle;

export function loader({ request }: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;

  return { origin };
}

const sectionRoutes = new Set([
  "services",
  "about",
  "patrons",
  "booking",
  "faq",
]);

const legalRoutes = new Set(["privacy", "terms"]);

function getCanonicalPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length >= 2) {
    const [, section] = segments;
    if (sectionRoutes.has(section)) {
      return `/${segments[0]}`;
    }
    if (legalRoutes.has(section)) {
      return `/home/${section}`;
    }
  }
  return pathname;
}

export function meta({ location, matches }: Route.MetaArgs) {
  const routeMatches = matches ?? [];
  const definedMatches = routeMatches.filter(
    (match): match is NonNullable<typeof match> => Boolean(match)
  );
  const rootMatch =
    definedMatches.find((match) => match.id === "root") ?? definedMatches.at(0);
  const origin =
    rootMatch && "data" in rootMatch
      ? (rootMatch.data as { origin?: string }).origin
      : undefined;
  const canonicalUrl = location
    ? `${siteUrl}${getCanonicalPath(location.pathname)}`
    : siteUrl;
  const ogImageUrl = new URL(ogImage, origin ?? siteUrl).toString();

  return [
    { title },
    { name: "description", content: siteDescription },
    { name: "author", content: "Rollick Carlberg West" },
    { name: "robots", content: "index,follow" },
    { property: "og:site_name", content: siteName },
    { property: "og:title", content: siteTitle },
    { property: "og:description", content: siteDescription },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: ogImageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: siteTitle },
    { name: "twitter:description", content: siteDescription },
    { name: "twitter:image", content: ogImageUrl },
  ];
}

export function links(): ReturnType<Route.LinksFunction> {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@400;600&display=swap",
    },
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const canonicalUrl = `${siteUrl}${getCanonicalPath(pathname)}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <Meta />
        <Links />
        <GoogleAnalytics />
      </head>
      <body>
        <div className="font-sans antialiased text-gray-900 bg-texture-parchment min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <JsonLd />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isRouteError = isRouteErrorResponse(error);
  const message = isRouteError
    ? error.status === 404
      ? "404"
      : "Error"
    : "Oops!";
  const details = isRouteError
    ? error.status === 404
      ? "The requested page could not be found."
      : error.statusText || "An unexpected error occurred."
    : import.meta.env.DEV && error instanceof Error
      ? error.message
      : "An unexpected error occurred.";
  const stack =
    !isRouteError && import.meta.env.DEV && error instanceof Error
      ? error.stack
      : undefined;

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
