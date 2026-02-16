import { faqTitle } from "./site";
import { getFaqMarkdownItems } from "~/utils/faq";

export type TownFaqItem = {
  answerMarkdown: string;
  id: string;
  question: string;
};

export type TownPageData = {
  slug: string;
  name: string;
  heroTitle: string;
  heroTagline: string;
  metaTitle: string;
  metaDescription: string;
  serviceAreaCopy: string;
  faqTitle: string;
  faqItems: TownFaqItem[];
  cityOptions: string[];
};

const baseFaqMarkdownItems = getFaqMarkdownItems();

const defaultCityOptions = [
  "Belleville",
  "Bloomfield",
  "Cedar Grove",
  "Clifton",
  "East Orange",
  "Glen Ridge",
  "Maplewood",
  "Montclair",
  "Nutley",
  "Orange",
  "South Orange",
  "Verona",
  "West Orange",
];

function slugifyTown(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function applyFaqTownTokens(
  value: string,
  townContext: { name: string; slug: string }
) {
  return value
    .replace(/\{\{town\}\}/g, townContext.name)
    .replace(/\{\{town_slug\}\}/g, townContext.slug);
}

function createTownFaqItemFromMarkdown(
  item: { answerMarkdown: string; id: string; question: string },
  townContext: { name: string; slug: string }
): TownFaqItem {
  return {
    answerMarkdown: applyFaqTownTokens(item.answerMarkdown, townContext),
    id: item.id,
    question: applyFaqTownTokens(item.question, townContext),
  };
}

const defaultTownContext = { name: "Northern New Jersey", slug: "home" };

function hasTownToken(item: { answerMarkdown: string; question: string }) {
  const townTokenPattern = /\{\{town(?:_slug)?\}\}/;
  return (
    townTokenPattern.test(item.question) ||
    townTokenPattern.test(item.answerMarkdown)
  );
}

export const baseFaqItems: TownFaqItem[] = baseFaqMarkdownItems
  .filter((item) => !hasTownToken(item))
  .map((item) => createTownFaqItemFromMarkdown(item, defaultTownContext));

function getTownFaqOrderOffset(name: string, count: number) {
  const slug = slugifyTown(name);
  const total = slug
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return count === 0 ? 0 : total % count;
}

function buildTownFaqItems(name: string): TownFaqItem[] {
  const slug = slugifyTown(name);
  const townContext = { name, slug };

  const items: TownFaqItem[] = baseFaqMarkdownItems.map((item) => {
    if (item.id === "service-area") {
      return {
        ...createTownFaqItemFromMarkdown(item, townContext),
        answerMarkdown: `Yes. We bring the full D&D party experience to homes and venues in ${name}.`,
        question: `Do you offer D&D party games in ${name}?`,
      };
    }
    return createTownFaqItemFromMarkdown(item, townContext);
  });

  items.push(
    {
      answerMarkdown:
        "Most parties run 2-3 hours, and we can customize the length for your event.",
      id: `session-length-${slug}`,
      question: `How long is a typical ${name} session?`,
    },
    {
      answerMarkdown:
        "Most groups are ages 9-14, but we tailor every adventure to the group's comfort level.",
      id: `age-range-${slug}`,
      question: `What ages do you recommend for a ${name} D&D party?`,
    }
  );

  const offset = getTownFaqOrderOffset(name, items.length);
  return [...items.slice(offset), ...items.slice(0, offset)];
}

export const defaultTown: TownPageData = {
  slug: "home",
  name: "Northern New Jersey",
  heroTitle: "Your Next Great Adventure Starts Here",
  heroTagline:
    "Professional D&D campaigns, parties, and workshops designed to build math skills, storytelling, and lifelong friendships.",
  metaTitle: "D&D Party Games in Northern New Jersey | The Dice Bard",
  metaDescription:
    "D&D party games, campaigns, and workshops for kids in Northern New Jersey. Mobile dungeon master services for birthdays, parties, and ongoing adventures.",
  serviceAreaCopy:
    "We serve families across New Jersey’s Essex and Passaic County, including Montclair, Glen Ridge, Bloomfield, Nutley, Verona, Cedar Grove, Clifton, and nearby towns.",
  faqTitle,
  faqItems: baseFaqItems,
  cityOptions: defaultCityOptions,
};

function createTownPageData(name: string): TownPageData {
  const slug = slugifyTown(name);

  return {
    slug,
    name,
    heroTitle: `D&D Party Games in ${name}`,
    heroTagline: `Professional Dungeons & Dragons campaigns, parties, and workshops in ${name}.`,
    metaTitle: `D&D Party Games in ${name}, NJ | The Dice Bard`,
    metaDescription: `D&D party games, campaigns, and workshops for kids in ${name}, NJ. Mobile dungeon master services for birthdays, parties, and ongoing adventures.`,
    serviceAreaCopy: `We serve families in ${name} and nearby towns across Essex & Passaic County.`,
    faqTitle,
    faqItems: buildTownFaqItems(name),
    cityOptions: defaultCityOptions,
  };
}

const additionalTowns = defaultCityOptions.map(createTownPageData);

export const townPages: TownPageData[] = [defaultTown, ...additionalTowns];
