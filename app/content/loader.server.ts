import { z } from "zod";
import { replaceTokens } from "./tokens.server";
import { frontmatter as siteFrontmatter } from "~/content/site.mdx";
import { frontmatter as aboutFrontmatter } from "~/content/about.mdx";
import { frontmatter as dndInfoFrontmatter } from "~/content/dnd-info.mdx";
import { frontmatter as servicesFrontmatter } from "~/content/services.mdx";
import { frontmatter as patronsFrontmatter } from "~/content/patrons.mdx";
import { frontmatter as footerFrontmatter } from "~/content/footer.mdx";

const SiteConfigSchema = z.object({
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

const AboutFrontmatterSchema = z.object({
  title: z.string().default("About the Dungeon Master"),
  stickerQuote: z
    .string()
    .default(
      "A safe, inclusive environment where every player feels welcomed."
    ),
  promiseTitle: z.string().default('The "Patron" Portal Promise'),
  promiseBody: z
    .string()
    .default(
      "For parents, safety and education are paramount. All sessions are monitored, age-appropriate, and designed to foster social growth."
    ),
  promiseButtonText: z.string().default("Read Parent Testimonials"),
});

export type AboutContent = z.infer<typeof AboutFrontmatterSchema>;

const ServiceItemSchema = z.object({
  title: z.string(),
  price: z.string(),
  desc: z.string(),
  cta: z.string(),
  highlight: z.boolean(),
  intent: z.string(),
});

const ServicesFrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  items: z.array(ServiceItemSchema),
});

export type ServicesContent = z.infer<typeof ServicesFrontmatterSchema>;

const InfoBenefitSchema = z.object({
  title: z.string(),
  desc: z.string(),
});

const InfoFrontmatterSchema = z.object({
  title: z.string(),
  introParagraph1: z.string(),
  introQuote: z.string(),
  introParagraph2: z.string(),
  benefits: z.array(InfoBenefitSchema),
});

export type InfoContent = z.infer<typeof InfoFrontmatterSchema>;

const TestimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
});

const PatronsFrontmatterSchema = z.object({
  title: z.string(),
  testimonials: z.array(TestimonialSchema),
  resourcesTitle: z.string(),
  resourcesDesc: z.string(),
  safetyGuideLabel: z.string(),
  safetyGuideUrl: z.string(),
  consentFormLabel: z.string(),
  consentFormUrl: z.string(),
});

export type PatronsContent = z.infer<typeof PatronsFrontmatterSchema>;

const FooterFrontmatterSchema = z.object({
  tagline: z.string(),
  copyright: z.string(),
  disclaimer: z.string(),
  privacyLabel: z.string(),
  termsLabel: z.string(),
});

export type FooterContent = z.infer<typeof FooterFrontmatterSchema>;

export function getSiteConfig(): SiteConfig {
  return SiteConfigSchema.parse(siteFrontmatter);
}

export function getAboutContent(): AboutContent {
  return replaceTokens(AboutFrontmatterSchema.parse(aboutFrontmatter));
}

export function getServicesContent(): ServicesContent {
  return replaceTokens(ServicesFrontmatterSchema.parse(servicesFrontmatter));
}

export function getDndInfoContent(): InfoContent {
  return replaceTokens(InfoFrontmatterSchema.parse(dndInfoFrontmatter));
}

export function getPatronsContent(): PatronsContent {
  return replaceTokens(PatronsFrontmatterSchema.parse(patronsFrontmatter));
}

export function getFooterContent(): FooterContent {
  return replaceTokens(FooterFrontmatterSchema.parse(footerFrontmatter));
}
