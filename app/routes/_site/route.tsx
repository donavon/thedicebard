import { Outlet } from "react-router";
import type { Route } from "./+types/route";
import { getFooterContent } from "~/content/loader.server";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { JsonLd } from "./components/json-ld";

export async function loader() {
  const footerContent = getFooterContent();
  return { footerContent };
}

export default function SiteLayoutRoute({ loaderData }: Route.ComponentProps) {
  const { footerContent } = loaderData;
  return (
    <div className="font-sans antialiased text-gray-900 bg-texture-parchment min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer content={footerContent} />
      <JsonLd />
    </div>
  );
}
