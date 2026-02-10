import heroParchment from "../../assets/hero/parchment-paper.webp";
import { Dragon } from "./dragon";
import { HeroButton } from "./hero-button";
import { heroButtons } from "./hero-data";

type MobileHeroProps = {
  title?: string;
  tagline?: string;
};

export function MobileHero({ title, tagline }: MobileHeroProps) {
  const heroTitle = title ?? "Your Next Great Adventure Starts Here";
  const heroTagline =
    tagline ??
    "Professional D&D campaigns, parties, and workshops designed to build math skills, storytelling, and lifelong friendships.";

  return (
    <div className="md:hidden -mx-4 sm:-mx-6 pb-44 overflow-visible">
      <div className="relative h-[550px] overflow-visible z-20">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-[140%] -translate-x-1/2 bg-center bg-cover"
          style={{ backgroundImage: `url(${heroParchment})` }}
        />
        <div className="relative flex h-full items-center justify-center px-6">
          <div className="text-center text-ink-blue max-w-[88%]">
            <h1 className="text-center font-serif uppercase text-[clamp(1.7rem,7vw,2.4rem)] tracking-wide text-[#8A1E1A] font-bold leading-tight text-balance drop-shadow-[0_2px_2px_rgba(253,246,227,0.7)]">
              {heroTitle}
            </h1>
            <p className="text-center mt-2 text-[0.98rem] leading-relaxed text-black text-balance">
              {heroTagline}
            </p>
            <div className="mt-5 flex flex-col items-center gap-4">
              {heroButtons.map((button) => (
                <HeroButton
                  key={button.label}
                  label={button.label}
                  section={button.section}
                  image={button.image}
                  variant="mobile"
                />
              ))}
            </div>
          </div>
        </div>

        <Dragon className="-bottom-32 left-1/2 z-30 w-55 -translate-x-1/2 drop-shadow-[0_16px_28px_rgba(92,58,30,0.5)]" />
      </div>
    </div>
  );
}
