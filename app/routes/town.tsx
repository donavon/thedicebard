import type { MetaFunction } from "react-router";
import { useParams } from "react-router";
import { HomeView } from "./home";
import { getTownBySlug } from "../data/towns";

export default function TownRoute() {
  const { town } = useParams();
  return <HomeView town={getTownBySlug(town ?? "home")} />;
}

export const meta: MetaFunction = ({ params }) => {
  const town = getTownBySlug(params.town ?? "home");
  return [
    { title: town.metaTitle },
    { name: "description", content: town.metaDescription },
  ];
};
