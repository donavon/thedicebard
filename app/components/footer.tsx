import { Link } from "react-router";
import { useLayoutLoaderData } from "~/hooks/use-layout-loader-data";

export function Footer() {
  const { footerContent } = useLayoutLoaderData();
  const { tagline, copyright, disclaimer, privacyLabel, termsLabel } =
    footerContent;

  return (
    <footer className="bg-ink-blue text-parchment py-12 border-t border-parchment/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif font-bold mb-2">{tagline}</h2>
          <p className="opacity-60 text-sm">{copyright}</p>
        </div>

        <nav className="flex gap-6 text-sm font-medium opacity-80">
          <Link
            to="/privacy"
            className="hover:text-dragon-red transition-colors"
          >
            {privacyLabel}
          </Link>
          <Link to="/terms" className="hover:text-dragon-red transition-colors">
            {termsLabel}
          </Link>
        </nav>
      </div>
      <p className="mt-6 px-4 text-xs opacity-60 text-center max-w-4xl mx-auto text-balance">
        {disclaimer}
      </p>
    </footer>
  );
}
