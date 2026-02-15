import type { Route } from "./+types/route";
import { SectionScrollRoute } from "~/features/home/components/section-scroll-route";
import {
  getAboutContent,
  getDndInfoContent,
  getPatronsContent,
  getServicesContent,
} from "~/content/loader.server";

export async function loader() {
  return {
    about: getAboutContent(),
    dndInfo: getDndInfoContent(),
    patrons: getPatronsContent(),
    services: getServicesContent(),
  };
}

export default function PatronsRoute({ loaderData }: Route.ComponentProps) {
  return <SectionScrollRoute sectionId="patrons" cmsContent={loaderData} />;
}
