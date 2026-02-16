import { Outlet } from "react-router";
import {
  getAboutContent,
  getDndInfoContent,
  getFooterContent,
  getPatronsContent,
  getServicesContent,
} from "~/content/loader.server";
import { SiteLayout } from "~/components/site-layout";

export async function loader() {
  return {
    footerContent: getFooterContent(),
    about: getAboutContent(),
    dndInfo: getDndInfoContent(),
    patrons: getPatronsContent(),
    services: getServicesContent(),
  };
}

export default function SiteLayoutRoute() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
