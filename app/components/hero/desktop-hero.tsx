import heroParchment from "../../assets/hero/parchment-paper.webp";
import { Dragon } from "./dragon";
import { HeroButton } from "./hero-button";
import { heroButtons } from "./hero-data";

type DesktopHeroProps = {
  title?: string;
  tagline?: string;
};

export function DesktopHero({ title, tagline }: DesktopHeroProps) {
  const heroTitle = title ?? "Your Next Great Adventure Starts Here";
  const heroTagline =
    tagline ??
    "Professional D&D campaigns, parties, and workshops designed to build math skills, storytelling, and lifelong friendships.";

  return (
    <div className="relative mx-auto w-full max-w-7xl hidden md:block">
      <img
        src={heroParchment}
        alt=""
        width={1280}
        height={755}
        className="w-full h-auto block px-8"
        aria-hidden="true"
      />
      <Dragon className="left-0 top-[66%] w-[31%] max-w-none -translate-x-[8%] -translate-y-1/2 rotate-[-4deg] opacity-95 filter drop-shadow-[4px_5px_6px_rgba(20,8,3,0.8)] drop-shadow-[8px_14px_16px_rgba(20,8,3,0.55)]" />

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-6 lg:px-8">
        <span className="pointer-events-none absolute bottom-[10.5%] right-[8.5%] hidden text-[0.7rem] font-medium text-ink-blue md:inline-block">
          Serving Northern New Jersey
        </span>
        <div className="text-center text-ink-blue max-w-[92%] sm:max-w-3xl lg:max-w-4xl">
          <h1 className="font-serif uppercase text-[clamp(1.6rem,4.2vw,3.3rem)] md:text-[clamp(1.9rem,3.8vw,3.2rem)] lg:text-[clamp(1.8rem,4.5vw,3.75rem)] tracking-wide text-[#8A1E1A] font-bold leading-tight text-balance drop-shadow-[0_2px_2px_rgba(253,246,227,0.7)] max-w-[22ch] md:max-w-[24ch] lg:max-w-[26ch] mx-auto px-2 sm:px-4">
            {heroTitle}
          </h1>

          <p className="mt-2 sm:mt-4 md:mt-3 lg:mt-8 text-[clamp(0.9rem,2.2vw,1.1rem)] md:text-[clamp(0.95rem,2vw,1.05rem)] lg:text-[clamp(0.95rem,2.5vw,1.2rem)] text-black max-w-lg md:max-w-md lg:max-w-lg mx-auto text-balance">
            {heroTagline}
          </p>

          <div className="mt-4 sm:mt-16 md:mt-6 lg:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-5">
            {heroButtons.map((props) => (
              <HeroButton key={props.label} {...props} variant="desktop" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
