import type { MetaFunction } from "react-router";
import { HomeView } from "./home";
import { getTownBySlug } from "../data/towns";

const town = getTownBySlug("glenridge");

export default function GlenRidgeRoute() {
  return <HomeView town={town} />;
}

export const meta: MetaFunction = () => {
  return [
    { title: town.metaTitle },
    { name: "description", content: town.metaDescription },
  ];
};
