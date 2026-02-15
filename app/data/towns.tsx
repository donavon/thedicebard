import type { ReactNode } from "react";
import { Link } from "react-router";
import { faqTitle } from "./site";

export type TownFaqItem = {
  question: string;
  answer: ReactNode;
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

export const baseFaqItems: TownFaqItem[] = [
  {
    question: "What exactly is D&D?",
    answer: (
      <>
        Think of it as a <strong>collaborative campfire story</strong> where
        kids are the main characters. As the Dungeon Master, I describe the
        world and the monsters, players decide what to do next, and dice decide
        whether daring plans succeed. It is heavy on imagination, light on
        screen time, and great for teamwork.
      </>
    ),
  },
  {
    question: 'What kind of "loot" do we need to provide?',
    answer: (
      <>
        Honestly, just a surface. A{" "}
        <strong>dining table, kitchen island, or outdoor picnic table</strong>{" "}
        works great. I bring the hoard: dice, character sheets, maps, and
        miniatures. No expensive manuals required on your end.
      </>
    ),
  },
  {
    question: "Is D&D appropriate for ages 10–13?",
    answer: (
      <>
        Absolutely. Sessions are <strong>age-appropriate</strong>, creative, and
        focused on teamwork and problem-solving. Think PG-rated adventures like{" "}
        <em>The Hobbit</em> or <em>Stranger Things</em> (minus the scary bits).
      </>
    ),
  },
  {
    question: "How many players can join the party?",
    answer: (
      <>
        For the best experience, a party of <strong>5–6 players</strong> gives
        everyone plenty of spotlight time.
      </>
    ),
  },
  {
    question: "Does it have to be a one-time thing?",
    answer:
      "Not at all. We run one-shot parties and ongoing campaigns, so if kids catch the D&D bug we can continue their story weekly or monthly.",
  },
  {
    question: "D&D for a birthday party?",
    answer:
      "It is a memorable, immersive upgrade from typical parties. Everyone gets a chance to shine in the story.",
  },
  {
    question: "What if my child has never played before?",
    answer:
      'Perfect. Most players start as "Level 1" in real life. We teach the basics quickly, and kids are usually casting spells and dodging traps within about 20 minutes.',
  },
  {
    question: "Where do you offer your D&D party experience?",
    answer:
      "We serve families across Essex & Passaic County, including Montclair, Glen Ridge, Bloomfield, Nutley, Verona, Cedar Grove, Clifton, and nearby towns.",
  },
  {
    question: "Any pro tips for parents?",
    answer:
      'Having snacks ("healing potions" and "rations") on hand is always a hit. Adventuring is hungry work.',
  },
  {
    question: "Why is D&D popular again?",
    answer: (
      <>
        Pop culture helped bring it back—especially Stranger Things and Hawkins,
        Indiana. We wrote a short overview{" "}
        <Link to="/blog/dnd-resurgence-stranger-things" className="underline">
          on our blog
        </Link>
        .
      </>
    ),
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
