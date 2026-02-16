import { useRouteLoaderData } from "react-router";
import type { loader as layoutLoader } from "~/routes/_layout/route";

export function useLayoutLoaderData() {
  const data = useRouteLoaderData<typeof layoutLoader>("routes/_layout");
  if (data) return data;

  throw new Error("Layout loader data not found");
}
