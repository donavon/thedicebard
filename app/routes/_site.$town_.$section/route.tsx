import { useEffect } from "react";
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/route";
import { useParams, useSearchParams } from "react-router";
import { scrollToSection } from "~/utils/scroll";
import { HomeView } from "~/features/home/home-view";
import { getTownBySlug } from "~/utils/town";
import { PrivacyPage } from "~/features/legal/privacy-page";
import { TermsPage } from "~/features/legal/terms-page";
import {
  getAboutContent,
  getDndInfoContent,
  getPatronsContent,
  getServicesContent,
} from "~/content/loader.server";

const SECTION_IDS = new Set(["services", "about", "patrons", "booking", "faq"]);

export async function loader() {
  return {
    about: getAboutContent(),
    dndInfo: getDndInfoContent(),
    patrons: getPatronsContent(),
    services: getServicesContent(),
  };
}

export default function TownSectionRoute({ loaderData }: Route.ComponentProps) {
  const { town, section } = useParams();
  const [searchParams] = useSearchParams();
  const bookingIntent = searchParams.get("intent");
  const townData = getTownBySlug(town ?? "home");

  useEffect(() => {
    if (!section || !SECTION_IDS.has(section)) {
      return;
    }

    const target = document.getElementById(section);
    if (!target) {
      return;
    }

    scrollToSection(section, { behavior: "smooth" });

    if (section !== "booking" || !bookingIntent) {
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
  }, [bookingIntent, section]);

  if (section === "privacy") {
    return <PrivacyPage />;
  }

  if (section === "terms") {
    return <TermsPage />;
  }

  return <HomeView town={townData} cmsContent={loaderData} />;
}

export const meta: MetaFunction = ({ params }) => {
  const town = getTownBySlug(params.town ?? "home");
  return [
    { title: town.metaTitle },
    { name: "description", content: town.metaDescription },
  ];
};
