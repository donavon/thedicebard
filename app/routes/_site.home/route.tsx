import { useLocation } from "react-router";
import { getTownBySlug } from "~/utils/town";
import { HomeView } from "~/features/home/home-view";

export default function HomeRoute() {
  const { pathname } = useLocation();
  const slug = pathname.replace("/", "") || "home";
  const town = getTownBySlug(slug);

  return <HomeView town={town} />;
}
