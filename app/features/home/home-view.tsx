import { About } from "./components/about";
import { BookingWidget } from "./components/booking-widget";
import { Faq } from "./components/faq";
import { Hero } from "./components/hero";
import { InfoSection } from "./components/info-section";
import { PatronPortal } from "./components/patron-portal";
import { ServiceArea } from "./components/service-area";
import { Services } from "./components/services";
import type { TownPageData } from "~/data/towns";
import type {
  getAboutContent,
  getDndInfoContent,
  getPatronsContent,
  getServicesContent,
} from "~/content/loader.server";

type HomeViewProps = {
  town: TownPageData;
  cmsContent: {
    about: ReturnType<typeof getAboutContent>;
    dndInfo: ReturnType<typeof getDndInfoContent>;
    patrons: ReturnType<typeof getPatronsContent>;
    services: ReturnType<typeof getServicesContent>;
  };
};

export function HomeView({ town, cmsContent }: HomeViewProps) {
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
