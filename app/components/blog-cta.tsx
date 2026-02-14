import { Link, useLocation } from "react-router";
import buttonWaxRedSmall from "../assets/hero/wax-button-small-cropped.webp";

type BlogCtaVariant = "inline" | "closing";

type BlogCtaProps = {
  variant?: BlogCtaVariant;
};

export function BlogCta({ variant = "inline" }: BlogCtaProps) {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).at(1) ?? "blog";
  const href = `/home/booking?utm_source=blog&utm_medium=cta&utm_campaign=${encodeURIComponent(
    slug
  )}`;
  const eyebrow =
    variant === "closing"
      ? "Your Adventure Starts Here"
      : "Need Help Getting Started?";
  const title =
    variant === "closing"
      ? "Ready to Play Your First Session?"
      : "Book a Free 15-Min Call";
  const description =
    variant === "closing"
      ? "Book now and we’ll handle setup, characters, and pacing so your first game feels easy, social, and fun."
      : "Choose the right session and plan your first game.";
  const buttonLabel =
    variant === "closing" ? "Book Session" : "Free Intro Call";

  return (
    <div className="mt-10 rounded-2xl border border-dragon-red/30 bg-[#F3E2C6] px-6 py-5 shadow-[0_14px_24px_rgba(92,58,30,0.18)] md:flex md:items-center md:justify-between md:gap-6">
      <div className="flex flex-col gap-1 text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-blue/70">
          {eyebrow}
        </p>
        <h3 className="text-2xl font-serif font-bold text-ink-blue">{title}</h3>
        <p className="text-ink-blue/80">{description}</p>
      </div>
      <div className="mt-4 flex justify-center md:justify-start md:mt-0 md:shrink-0">
        <Link
          to={href}
          className="relative inline-flex h-[46px] items-center justify-center px-8 text-parchment font-serif text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5"
        >
          <img
            src={buttonWaxRedSmall}
            alt=""
            className="absolute inset-0 h-full w-full object-fill"
            aria-hidden="true"
          />
          <span className="relative drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]">
            {buttonLabel}
          </span>
        </Link>
      </div>
    </div>
  );
}
