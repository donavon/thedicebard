import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { scrollToSection } from "../utils/scroll";
import { HomeView } from "./home";
import { getTownBySlug } from "../data/towns";

type SectionScrollRouteProps = {
  sectionId: string;
};

export function SectionScrollRoute({
  sectionId,
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
      Array.from(select.options).some((option) => option.value === bookingIntent)
    ) {
      select.value = bookingIntent;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, [bookingIntent, sectionId]);

  return <HomeView town={getTownBySlug("default")} />;
}
