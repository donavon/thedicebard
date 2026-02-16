import type { LoaderFunctionArgs } from "react-router";

const securityMessage = `
# INVESTIGATION CHECK: SUCCESS
# ----------------------------
# You search the code for vulnerabilities and find...
# nothing but a few stray kobolds and an empty chest.
#
# This site does not handle gold (payments) or scrolls (passwords).
# Our magic is purely aesthetic.
#
# If you actually found a rift in the weave (a bug), 
# feel free to send a carrier pigeon (email) to: admin@thedicebard.com
`.trim();

const headers = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=3600", // Increased cache for efficiency
};

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Handle Security.txt with a D&D twist
  if (pathname.endsWith("security.txt")) {
    return new Response(securityMessage, { status: 200, headers });
  }

  // Fallback for everything else (Browser extensions, noise, etc.)
  // Returning 204 (No Content) satisfies the request without bloating logs.
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405, headers });
  }

  return new Response(null, { status: 204, headers });
}
