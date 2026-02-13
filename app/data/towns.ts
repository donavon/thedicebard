import { faqTitle } from "./site";

export type TownFaqItem = {
  question: string;
  answer: string;
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

const baseFaqItems: TownFaqItem[] = [
  {
    question: "What exactly is D&D?",
    answer:
      "Think of it as a collaborative story where kids are the main characters. The Dungeon Master describes the world, the players decide what to do, and dice tell us if their plans succeed.",
  },
  {
    question: 'What kind of "loot" do we need to provide?',
    answer:
      "Just a surface like a dining table or kitchen island. We bring dice, character sheets, maps, and miniatures.",
  },
  {
    question: "Is D&D appropriate for ages 10–13?",
    answer:
      "Absolutely. Sessions are age-appropriate, creative, and focused on teamwork and problem-solving.",
  },
  {
    question: "How many players can join the party?",
    answer:
      "For the best experience, a party of 5–6 players gives everyone plenty of spotlight time.",
  },
  {
    question: "Does it have to be a one-time thing?",
    answer: "Not at all. We run both one-shot parties and ongoing campaigns.",
  },
  {
    question: "D&D for a birthday party?",
    answer:
      "It is a memorable, immersive upgrade from typical parties. Everyone gets a chance to shine in the story.",
  },
  {
    question: "What if my child has never played before?",
    answer:
      "Perfect. We teach the basics quickly and make sure everyone feels confident before the adventure starts.",
  },
  {
    question: "Where do you offer your D&D party experience?",
    answer:
      "We serve families across Essex & Passaic County, including Montclair, Glen Ridge, Bloomfield, Nutley, Verona, Cedar Grove, Clifton, and nearby towns.",
  },
];

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

function getTownFaqOrderOffset(name: string, count: number) {
  const slug = slugifyTown(name);
  const total = slug
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return count === 0 ? 0 : total % count;
}

function buildTownFaqItems(name: string): TownFaqItem[] {
  const items: TownFaqItem[] = baseFaqItems.map((item) => {
    if (item.question === "Where do you offer your D&D party experience?") {
      return {
        question: `Do you offer D&D party games in ${name}?`,
        answer: `Yes. We bring the full D&D party experience to homes and venues in ${name}.`,
      };
    }
    return item;
  });

  items.push(
    {
      question: `How long is a typical ${name} session?`,
      answer:
        "Most parties run 2–3 hours, and we can customize the length for your event.",
    },
    {
      question: `What ages do you recommend for a ${name} D&D party?`,
      answer:
        "Most groups are ages 9–14, but we tailor every adventure to the group’s comfort level.",
    }
  );

  const offset = getTownFaqOrderOffset(name, items.length);
  return [...items.slice(offset), ...items.slice(0, offset)];
}

const defaultTown: TownPageData = {
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

const glenRidge: TownPageData = {
  slug: "glenridge",
  name: "Glen Ridge",
  heroTitle: "D&D Party Games in Glen Ridge",
  heroTagline:
    "Professional Dungeons & Dragons campaigns, parties, and workshops in Glen Ridge.",
  metaTitle: "D&D Party Games in Glen Ridge, NJ | The Dice Bard",
  metaDescription:
    "D&D party games, campaigns, and workshops for kids in Glen Ridge, NJ. Mobile dungeon master services for birthdays, parties, and ongoing adventures.",
  serviceAreaCopy:
    "We serve families in Glen Ridge and nearby towns across Essex & Passaic County.",
  faqTitle,
  faqItems: buildTownFaqItems("Glen Ridge"),
  cityOptions: defaultCityOptions,
};

const montclair: TownPageData = {
  slug: "montclair",
  name: "Montclair",
  heroTitle: "D&D Party Games in Montclair",
  heroTagline:
    "Professional Dungeons & Dragons campaigns, parties, and workshops in Montclair.",
  metaTitle: "D&D Party Games in Montclair, NJ | The Dice Bard",
  metaDescription:
    "D&D party games, campaigns, and workshops for kids in Montclair, NJ. Mobile dungeon master services for birthdays, parties, and ongoing adventures.",
  serviceAreaCopy:
    "We serve families in Montclair and nearby towns across Essex & Passaic County.",
  faqTitle,
  faqItems: buildTownFaqItems("Montclair"),
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

const additionalTownNames = defaultCityOptions.filter(
  (name) => name !== "Glen Ridge" && name !== "Montclair"
);

const additionalTowns = additionalTownNames.map(createTownPageData);

const townPages: TownPageData[] = [
  defaultTown,
  glenRidge,
  montclair,
  ...additionalTowns,
];

function getTownBySlug(slug: string) {
  const normalized = slug.toLowerCase();
  return townPages.find((town) => town.slug === normalized) ?? defaultTown;
}

export {
  baseFaqItems,
  defaultTown,
  glenRidge,
  montclair,
  townPages,
  getTownBySlug,
};
