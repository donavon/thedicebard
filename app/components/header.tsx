import { useRef } from "react";
import { Link, useLocation } from "react-router";
import buttonWaxRedSmall from "../assets/hero/wax-button-small-cropped.webp";
import { getTownSlugFromPathname } from "../utils/town";
import { HeroButton } from "./hero/hero-button";
import { heroButtons } from "./hero/hero-data";

type NavItem = {
  label: string;
  section: string;
};

const navItems: NavItem[] = [
  { label: "Services", section: "services" },
  { label: "About", section: "about" },
  { label: "Patrons", section: "patrons" },
  // { label: "Contact", section: "booking" },
  { label: "FAQ", section: "faq" },
];

export function Header() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { pathname } = useLocation();
  const townSlug = getTownSlugFromPathname(pathname);

  function handleMenuToggle() {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
    }
  }

  function renderNavItem({ label, section }: NavItem) {
    return (
      <Link
        key={section}
        to={`/${townSlug}/${section}`}
        preventScrollReset
        className="text-ink-blue font-serif text-lg font-bold hover:text-dragon-red transition-colors"
      >
        {label}
      </Link>
    );
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  const [button] = heroButtons;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-sm shadow-md border-b-2 border-ink-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to={`/${townSlug}`} className="flex items-center gap-2 group">
            <span className="text-2xl lg:text-3xl font-serif font-bold text-ink-blue group-hover:text-dragon-red transition-colors duration-300">
              The Dice Bard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-8">
            {navItems.map(renderNavItem)}
            <Link
              to="/blog"
              className="text-ink-blue font-serif text-lg font-bold hover:text-dragon-red transition-colors"
            >
              Blog
            </Link>
            <Link
              to={`/${townSlug}/booking`}
              preventScrollReset
              className="ml-2 relative inline-flex items-center justify-center h-[44px] px-5 text-parchment font-serif text-xs font-medium uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5"
            >
              <img
                src={buttonWaxRedSmall}
                alt=""
                className="absolute inset-0 h-full w-full object-fill"
                aria-hidden="true"
              />
              <span className="relative drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] font-bold font-stretch-90%">
                Book Quest
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-ink-blue hover:text-dragon-red transition-colors"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <dialog
        ref={dialogRef}
        className="md:hidden fixed inset-0 z-50 m-0 h-[100dvh] w-[100dvw] max-h-[100dvh] max-w-[100dvw] overflow-hidden border-0 bg-parchment p-0 rounded-none"
        aria-modal="true"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-ink-blue/10 px-4 sm:px-6 h-16">
            <span className="text-2xl font-serif font-bold text-ink-blue">
              Menu
            </span>
            <form method="dialog">
              <button
                type="submit"
                className="p-2 text-ink-blue hover:text-dragon-red transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>

          <nav className="flex flex-1 flex-col px-6 py-6">
            {navItems.map(({ label, section }) => (
              <Link
                key={section}
                to={`/${townSlug}/${section}`}
                preventScrollReset
                className="flex h-16 items-center text-ink-blue font-serif text-xl font-bold border-b border-ink-blue/10 hover:text-dragon-red transition-colors"
                onClick={closeDialog}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/blog"
              className="flex h-16 items-center text-ink-blue font-serif text-xl font-bold border-b border-ink-blue/10 hover:text-dragon-red transition-colors"
              onClick={closeDialog}
            >
              Blog
            </Link>
            <div className="text-center pt-8">
              <HeroButton
                label={button.label}
                section={button.section}
                image={button.image}
                variant="mobile"
              />
            </div>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
