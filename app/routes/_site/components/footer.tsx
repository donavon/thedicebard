import { Link, useLocation } from "react-router";
import { getTownSlugFromPathname } from "~/utils/town";
import type { FooterContent } from "~/content/loader.server";

type FooterProps = {
  content: FooterContent;
};

export function Footer({ content }: FooterProps) {
  const { pathname } = useLocation();
  const townSlug = getTownSlugFromPathname(pathname);

  const { tagline, copyright, disclaimer, privacyLabel, termsLabel } = content;

  return (
    <footer className="bg-ink-blue text-parchment py-12 border-t border-parchment/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2
            className="text-2xl font-serif font-bold mb-2"
            dangerouslySetInnerHTML={{ __html: tagline }}
          />
          <p className="opacity-60 text-sm">{copyright}</p>
        </div>

        <nav className="flex gap-6 text-sm font-medium opacity-80">
          <Link
            to={`/${townSlug}/privacy`}
            className="hover:text-dragon-red transition-colors"
          >
            {privacyLabel}
          </Link>
          <Link
            to={`/${townSlug}/terms`}
            className="hover:text-dragon-red transition-colors"
          >
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
