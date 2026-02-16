import { z } from "zod";
import { frontmatter as siteFrontmatter } from "~/content/site.mdx";

export const SiteConfigSchema = z.object({
  siteName: z.string(),
  siteUrl: z.string(),
  siteLocale: z.string().default("en-US"),
  siteTimeZone: z.string().default("America/New_York"),
  siteTitle: z.string(),
  siteDescription: z.string(),
  ownerName: z.string(),
  contactName: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string().default(""),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

/**
 * Loads the site configuration from CMS.
 * This is safe to call on both server and client.
 */
export function getSiteConfig(): SiteConfig {
  return SiteConfigSchema.parse(siteFrontmatter);
}
