import { useLoaderData } from "react-router";
import type { loader as townLoader } from "~/routes/_layout.$town/route";

export function useCmsContent() {
  return useLoaderData<typeof townLoader>();
}
