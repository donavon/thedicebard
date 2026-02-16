import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { scrollToSection } from "~/utils/scroll";
import { HomeView } from "~/features/home/home-view";
import { getTownBySlug } from "~/utils/town";
import type {
  getAboutContent,
  getDndInfoContent,
  getPatronsContent,
  getServicesContent,
} from "~/content/loader.server";

type SectionScrollRouteProps = {
  sectionId: string;
  cmsContent: {
    about: ReturnType<typeof getAboutContent>;
    dndInfo: ReturnType<typeof getDndInfoContent>;
    patrons: ReturnType<typeof getPatronsContent>;
    services: ReturnType<typeof getServicesContent>;
  };
};

export function SectionScrollRoute({
  sectionId,
  cmsContent,
}: SectionScrollRouteProps) {
  const [searchParams] = useSearchParams();
  const bookingIntent = searchParams.get("intent");

  useEffect(() => {
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    scrollToSection(sectionId, { behavior: "smooth" });

    if (sectionId !== "booking" || !bookingIntent) {
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
  }, [bookingIntent, sectionId]);

  return <HomeView town={getTownBySlug("home")} cmsContent={cmsContent} />;
}
