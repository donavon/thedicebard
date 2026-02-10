import { DesktopHero } from "./desktop-hero";
import { MobileHero } from "./mobile-hero";

type HeroProps = {
  title?: string;
  tagline?: string;
};

export function Hero({ title, tagline }: HeroProps) {
  return (
    <section
      id="home"
      className="relative z-10 pt-8 md:pt-28 pb-0 md:pb-20 px-4 sm:px-6 lg:px-10"
    >
      <DesktopHero title={title} tagline={tagline} />
      <MobileHero title={title} tagline={tagline} />
    </section>
  );
}
