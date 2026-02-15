import { getSiteConfig } from "~/content/loader.server";

const site = getSiteConfig();

export const siteName = site.siteName;
export const siteUrl = site.siteUrl;
export const siteLocale = site.siteLocale;
export const siteTimeZone = site.siteTimeZone;
export const siteTitle = site.siteTitle;
export const siteDescription = site.siteDescription;
export const defaultTitle = site.siteTitle;
export const faqTitle = "Frequently Asked Quests (FAQ)";
