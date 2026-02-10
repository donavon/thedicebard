import { useLocation } from "react-router";
import { Hero } from "../components/hero";
import { InfoSection } from "../components/info-section";
import { Services } from "../components/services";
import { About } from "../components/about";
import { ServiceArea } from "../components/service-area";
import { PatronPortal } from "../components/patron-portal";
import { BookingWidget } from "../components/booking-widget";
import { TownFaq } from "../components/town-faq";
import { Faq } from "../components/faq";
import { getTownBySlug } from "../data/towns";
import type { TownPageData } from "../data/towns";

type HomeProps = {
  town: TownPageData;
};

export function HomeView({ town }: HomeProps) {
  const faqItems = [...town.commonFaqItems, ...town.extraFaqItems];

  return (
    <>
      <Hero title={town.heroTitle} tagline={town.heroTagline} />
      <InfoSection />
      <Services />
      <About />
      <ServiceArea copy={town.serviceAreaCopy} />
      <TownFaq title={town.faqTitle} items={faqItems} />
      <PatronPortal />
      <BookingWidget />
      <Faq />
    </>
  );
}

export default function HomeRoute() {
  const { pathname } = useLocation();
  const slug = pathname.replace("/", "") || "home";
  const town = getTownBySlug(slug);

  return <HomeView town={town} />;
}
