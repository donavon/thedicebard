import { useLayoutEffect } from "react";
import { About } from "./components/about";
import { BookingWidget } from "./components/booking-widget";
import { Faq } from "./components/faq";
import { Hero } from "./components/hero";
import { InfoSection } from "./components/info-section";
import { PatronPortal } from "./components/patron-portal";
import { ServiceArea } from "./components/service-area";
import { Services } from "./components/services";
import { scrollToSection } from "~/utils/scroll";
import { useScrollSync } from "~/hooks/use-scroll-sync";
import { SECTION_IDS } from "~/data/sections";
import type { TownPageData } from "~/data/towns";
import type {
  getAboutContent,
  getDndInfoContent,
  getPatronsContent,
  getServicesContent,
} from "~/content/loader.server";

type Props = {
  town: TownPageData;
  cmsContent: {
    about: ReturnType<typeof getAboutContent>;
    dndInfo: ReturnType<typeof getDndInfoContent>;
    patrons: ReturnType<typeof getPatronsContent>;
    services: ReturnType<typeof getServicesContent>;
  };
  initialSection?: string | null;
  bookingIntent?: string | null;
};

export function HomeView({
  town,
  cmsContent,
  initialSection,
  bookingIntent,
}: Props) {
  // Always enable scroll sync - it will handle programmatic scroll coordination internally
  useScrollSync({
    sectionIds: SECTION_IDS,
    townSlug: town.slug,
  });

  useLayoutEffect(() => {
    if (!initialSection) return;

    const target = document.getElementById(initialSection);
    if (!target) return;

    // Signal that programmatic scroll is starting
    window.dispatchEvent(new CustomEvent("programmatic-scroll-start"));

    scrollToSection(initialSection, {
      behavior: "smooth",
      onComplete: () => {
        // Signal that programmatic scroll has ended
        window.dispatchEvent(new CustomEvent("programmatic-scroll-end"));
      },
    });

    if (initialSection !== "booking" || !bookingIntent) {
      return;
    }

    const select = target.querySelector<HTMLSelectElement>("#service");
    if (
      select &&
      Array.from(select.options).some(
        (option) => option.value === bookingIntent
      )
    ) {
      select.value = bookingIntent;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, [initialSection, bookingIntent]);

  return (
    <>
      <Hero title={town.heroTitle} tagline={town.heroTagline} />
      <InfoSection content={cmsContent.dndInfo} />
      <Services content={cmsContent.services} />
      <About content={cmsContent.about} />
      <ServiceArea copy={town.serviceAreaCopy} />
      <PatronPortal content={cmsContent.patrons} />
      <BookingWidget />
      <Faq title={town.faqTitle} items={town.faqItems} />
    </>
  );
}
