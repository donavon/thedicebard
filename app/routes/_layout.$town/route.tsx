import type { MetaFunction } from "react-router";
import type { Route } from "./+types/route";
import { data, useParams } from "react-router";
import { HomeView } from "~/features/home/home-view";
import { getTownBySlug, isValidTownSlug } from "~/utils/town";
import {
  getAboutContent,
  getDndInfoContent,
  getPatronsContent,
  getServicesContent,
} from "~/content/loader.server";
import { useCmsContent } from "~/hooks/use-cms-content";

export async function loader({ params }: Route.LoaderArgs) {
  const townSlug = params.town ?? "home";

  if (!isValidTownSlug(townSlug)) {
    throw data(null, { status: 404, statusText: "Town Not Found" });
  }

  return {
    about: getAboutContent(),
    dndInfo: getDndInfoContent(),
    patrons: getPatronsContent(),
    services: getServicesContent(),
  };
}

export default function TownRoute() {
  const { town } = useParams();
  const cmsContent = useCmsContent();

  return (
    <HomeView town={getTownBySlug(town ?? "home")} cmsContent={cmsContent} />
  );
}

export const meta: MetaFunction = ({ params }) => {
  const town = getTownBySlug(params.town ?? "home");
  return [
    { title: town.metaTitle },
    { name: "description", content: town.metaDescription },
  ];
};
