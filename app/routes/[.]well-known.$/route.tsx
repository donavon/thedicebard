import type { LoaderFunctionArgs } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
  const headers = {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=300",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405, headers });
  }

  return new Response(null, { status: 204, headers });
}
