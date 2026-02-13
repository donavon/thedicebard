import { useLocation } from "react-router";
import { Hero } from "../components/hero";
import { InfoSection } from "../components/info-section";
import { Services } from "../components/services";
import { About } from "../components/about";
import { ServiceArea } from "../components/service-area";
import { PatronPortal } from "../components/patron-portal";
import { BookingWidget } from "../components/booking-widget";
import { Faq } from "../components/faq";
import { getTownBySlug } from "../data/towns";
import type { TownPageData } from "../data/towns";

type HomeProps = {
  town: TownPageData;
};

export function HomeView({ town }: HomeProps) {
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

export default function HomeRoute() {
  const { pathname } = useLocation();
  const slug = pathname.replace("/", "") || "home";
  const town = getTownBySlug(slug);

  return <HomeView town={town} />;
}
