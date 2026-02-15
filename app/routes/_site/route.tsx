import { Outlet } from "react-router";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { JsonLd } from "./components/json-ld";

export default function SiteLayoutRoute() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-texture-parchment min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <JsonLd />
    </div>
  );
}
