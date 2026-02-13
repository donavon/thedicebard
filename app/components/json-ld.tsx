import { townPages } from "../data/towns";
import { siteDescription, siteName, siteUrl } from "../data/site";

export function JsonLd() {
  const areaServed = townPages
    .filter((town) => town.slug !== "home")
    .map((town) => `${town.name}, NJ`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    name: siteName,
    url: siteUrl,
    areaServed,
    description: siteDescription,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
