import type { ComponentType } from "react";
import * as CreateCharacterModule from "../content/blog/create-your-first-character.mdx";
import * as DndResurgenceModule from "../content/blog/dnd-resurgence-stranger-things.mdx";
import * as DndForParentsModule from "../content/blog/dnd-for-parents.mdx";
import * as DiceChecksModule from "../content/blog/dice-checks-and-saves.mdx";
import * as DndJargonModule from "../content/blog/dnd-jargon-glossary.mdx";
import * as SessionZeroModule from "../content/blog/session-zero-basics.mdx";

type BlogContentComponent = ComponentType<{
  components?: Record<string, unknown>;
}>;

const blogContentBySlug: Record<string, BlogContentComponent> = {
  "create-your-first-character": CreateCharacterModule.default,
  "dnd-resurgence-stranger-things": DndResurgenceModule.default,
  "dnd-for-parents": DndForParentsModule.default,
  "dice-checks-and-saves": DiceChecksModule.default,
  "dnd-jargon-glossary": DndJargonModule.default,
  "session-zero-basics": SessionZeroModule.default,
};

function getBlogContentComponentBySlug(slug: string) {
  return blogContentBySlug[slug];
}

export { getBlogContentComponentBySlug };
