import { Link, useLocation } from "react-router";
import { getTownSlugFromPathname } from "../utils/town";

export function Footer() {
  const { pathname } = useLocation();
  const townSlug = getTownSlugFromPathname(pathname);

  return (
    <footer className="bg-ink-blue text-parchment py-12 border-t border-parchment/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif font-bold mb-2">
            The Dice Bard&trade;
          </h2>
          <p className="opacity-60 text-sm">
            © {new Date().getFullYear()} The Dice Bard. All rights reserved.
          </p>
        </div>

        <nav className="flex gap-6 text-sm font-medium opacity-80">
          <Link
            to={`/${townSlug}/privacy`}
            className="hover:text-dragon-red transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to={`/${townSlug}/terms`}
            className="hover:text-dragon-red transition-colors"
          >
            Terms of Service
          </Link>
        </nav>

        {/* <div className="flex gap-4">
          <Link
            to="/"
            className="w-10 h-10 rounded-full bg-parchment/10 flex items-center justify-center hover:bg-dragon-red transition-colors"
          >
            <span className="sr-only">Instagram</span>📷
          </Link>
          <Link
            to="/"
            className="w-10 h-10 rounded-full bg-parchment/10 flex items-center justify-center hover:bg-dragon-red transition-colors"
          >
            <span className="sr-only">Twitter</span>🐦
          </Link>
        </div> */}
      </div>
      <p className="mt-6 px-4 text-xs opacity-60 text-center max-w-4xl mx-auto text-balance">
        Dungeons &amp; Dragons and D&amp;D are trademarks of Wizards of the
        Coast LLC. This site and its services are not affiliated with, endorsed,
        sponsored, or approved by Wizards of the Coast.
      </p>
    </footer>
  );
}
