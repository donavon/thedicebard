import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { JsonLd } from "~/components/json-ld";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="font-sans antialiased text-gray-900 bg-texture-parchment min-h-screen flex flex-col">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
      <JsonLd />
    </div>
  );
}
