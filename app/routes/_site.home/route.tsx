import { useLocation } from "react-router";
import type { Route } from "./+types/route";
import { getTownBySlug } from "~/utils/town";
import {
  getAboutContent,
  getDndInfoContent,
  getPatronsContent,
  getServicesContent,
} from "~/content/loader.server";
import { HomeView } from "~/features/home/home-view";

export async function loader() {
  return {
    about: getAboutContent(),
    dndInfo: getDndInfoContent(),
    patrons: getPatronsContent(),
    services: getServicesContent(),
  };
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const slug = pathname.replace("/", "") || "home";
  const town = getTownBySlug(slug);

  return <HomeView town={town} cmsContent={loaderData} />;
}
