import type { MetaFunction } from "react-router";
import type { Route } from "./+types/route";
import { useParams } from "react-router";
import { HomeView } from "~/features/home/home-view";
import { getTownBySlug } from "~/utils/town";
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

export default function TownRoute({ loaderData }: Route.ComponentProps) {
  const { town } = useParams();
  return (
    <HomeView town={getTownBySlug(town ?? "home")} cmsContent={loaderData} />
  );
}

export const meta: MetaFunction = ({ params }) => {
  const town = getTownBySlug(params.town ?? "home");
  return [
    { title: town.metaTitle },
    { name: "description", content: town.metaDescription },
  ];
};
