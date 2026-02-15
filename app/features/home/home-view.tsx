import { About } from "./components/about";
import { BookingWidget } from "./components/booking-widget";
import { Faq } from "./components/faq";
import { Hero } from "./components/hero";
import { InfoSection } from "./components/info-section";
import { PatronPortal } from "./components/patron-portal";
import { ServiceArea } from "./components/service-area";
import { Services } from "./components/services";
import type { TownPageData } from "~/data/towns";

type HomeViewProps = {
  town: TownPageData;
};

export function HomeView({ town }: HomeViewProps) {
  return (
    <>
      <Hero title={town.heroTitle} tagline={town.heroTagline} />
      <InfoSection />
      <Services />
      <About />
      <ServiceArea copy={town.serviceAreaCopy} />
      <PatronPortal />
      <BookingWidget />
      <Faq title={town.faqTitle} items={town.faqItems} />
    </>
  );
}
