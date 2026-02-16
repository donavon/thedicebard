import type { MetaFunction } from "react-router";
import type { Route } from "./+types/route";
import { data, useParams } from "react-router";
import { HomeView } from "~/features/home/home-view";
import { getTownBySlug, isValidTownSlug } from "~/utils/town";
import { SECTION_IDS_SET } from "~/data/sections";
import { useLayoutLoaderData } from "~/hooks/use-layout-loader-data";

export async function loader({ params, request }: Route.LoaderArgs) {
  const townSlug = params.town ?? "home";
  const section = params.section;

  if (!isValidTownSlug(townSlug)) {
    throw data(null, { status: 404, statusText: "Town Not Found" });
  }

  // Extract booking intent from URL if present
  const url = new URL(request.url);
  const bookingIntent = url.searchParams.get("intent");

  // Return scroll hint from server
  return {
    scrollToSection: section && SECTION_IDS_SET.has(section) ? section : null,
    bookingIntent,
  };
}

export default function TownSectionRoute({ loaderData }: Route.ComponentProps) {
  const { town } = useParams();
  const townData = getTownBySlug(town ?? "home");
  const { about, dndInfo, patrons, services } = useLayoutLoaderData();

  return (
    <HomeView
      town={townData}
      cmsContent={{ about, dndInfo, patrons, services }}
      initialSection={loaderData.scrollToSection}
      bookingIntent={loaderData.bookingIntent}
    />
  );
}

export const meta: MetaFunction = ({ params }) => {
  const town = getTownBySlug(params.town ?? "home");
  return [
    { title: town.metaTitle },
    { name: "description", content: town.metaDescription },
  ];
};
