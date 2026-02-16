import { resolveRawText } from "~/utils/markdown";
import faqSource from "~/content/faq.md?raw";

const headingPattern = /^##\s+(.+?)\s*$/;
const headingIdPattern = /^(.*?)\s*\{#([a-z0-9-]+)\}\s*$/;

export type FaqMarkdownItem = {
  answerMarkdown: string;
  id: string;
  question: string;
};

function slugifyFaqId(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseHeading(value: string) {
  const explicitIdMatch = headingIdPattern.exec(value);
  if (explicitIdMatch) {
    const [, question, id] = explicitIdMatch;
    return {
      id,
      question: question.trim(),
    };
  }

  const question = value.trim();
  return {
    id: slugifyFaqId(question),
    question,
  };
}

function pushFaqItem(
  items: FaqMarkdownItem[],
  current: { id: string; question: string } | null,
  answerLines: string[]
) {
  if (!current) {
    return;
  }

  const answerMarkdown = answerLines.join("\n").trim();
  if (!answerMarkdown) {
    throw new Error(
      `FAQ item '${current.id}' is missing answer content in app/content/faq.md.`
    );
  }

  items.push({
    answerMarkdown,
    id: current.id,
    question: current.question,
  });
}

export function getFaqMarkdownItems() {
  const source = resolveRawText(faqSource, "app/content/faq.md?raw");
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const items: FaqMarkdownItem[] = [];

  let currentHeading: { id: string; question: string } | null = null;
  let answerLines: string[] = [];

  for (const line of lines) {
    const headingMatch = headingPattern.exec(line);

    if (headingMatch) {
      pushFaqItem(items, currentHeading, answerLines);
      currentHeading = parseHeading(headingMatch[1]);
      answerLines = [];
      continue;
    }

    if (!currentHeading) {
      continue;
    }

    answerLines.push(line);
  }

  pushFaqItem(items, currentHeading, answerLines);

  if (items.length === 0) {
    throw new Error(
      "No FAQ items found in app/content/faq.md. Use `## Question` headings followed by markdown answers."
    );
  }

  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) {
      throw new Error(
        `Duplicate FAQ id '${item.id}' in app/content/faq.md. Use unique headings or explicit ids like {#my-id}.`
      );
    }
    ids.add(item.id);
  }

  return items;
}
