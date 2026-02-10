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
  commonFaqItems: TownFaqItem[];
  extraFaqItems: TownFaqItem[];
  cityOptions: string[];
};

const commonFaqItems: TownFaqItem[] = [
  {
    question: "What exactly is D&D?",
    answer:
      "It’s a collaborative storytelling game where kids work together, roll dice, and solve problems in a shared adventure.",
  },
  {
    question: "What ages do you recommend?",
    answer:
      "Most groups are ages 9–14, but we tailor the experience to each group’s comfort level.",
  },
  {
    question: "What do we need to provide?",
    answer:
      "Just a table and chairs. We bring dice, character sheets, maps, and everything needed to play.",
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
  faqTitle: "D&D Party FAQs",
  commonFaqItems,
  extraFaqItems: [],
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
  faqTitle: "Glen Ridge D&D Party FAQs",
  commonFaqItems,
  extraFaqItems: [
    {
      question: "Do you host D&D parties in Glen Ridge?",
      answer:
        "Yes. We run D&D party experiences in Glen Ridge for birthdays, events, and small groups.",
    },
    {
      question: "What ages do you recommend for a Glen Ridge D&D party?",
      answer:
        "Most groups are ages 9–14, but we tailor the adventure to your group.",
    },
    {
      question: "What do we need to provide for a Glen Ridge session?",
      answer:
        "Just a table and chairs. We bring dice, character sheets, maps, and all game materials.",
    },
  ],
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
  faqTitle: "Montclair D&D Party FAQs",
  commonFaqItems,
  extraFaqItems: [
    {
      question: "Do you offer D&D party games in Montclair?",
      answer:
        "Yes. We bring the full D&D experience to homes and venues in Montclair.",
    },
    {
      question: "How long is a Montclair D&D party session?",
      answer:
        "Most parties run 2–3 hours, but we can customize the length.",
    },
    {
      question: "Is D&D in Montclair good for first-time players?",
      answer:
        "Absolutely. We teach the basics quickly and make sure every player shines.",
    },
  ],
  cityOptions: defaultCityOptions,
};

const townPages: TownPageData[] = [defaultTown, glenRidge, montclair];

function getTownBySlug(slug: string) {
  const normalized = slug.toLowerCase();
  return townPages.find((town) => town.slug === normalized) ?? defaultTown;
}

export {
  commonFaqItems,
  defaultTown,
  glenRidge,
  montclair,
  townPages,
  getTownBySlug,
};
