import { getSiteConfig } from "./loader.server";

/**
 * Token dictionary available in any CMS string.
 * Use `{{tokenName}}` in frontmatter values and they'll be expanded at load time.
 *
 * Add new tokens here — they'll be available everywhere automatically.
 */
function getTokens(): Record<string, string> {
  const now = new Date();
  const site = getSiteConfig();

  return {
    year: now.getFullYear().toString(),
    siteName: site.siteName,
    siteUrl: site.siteUrl,
    ownerName: site.ownerName,
    contactName: site.contactName,
    contactEmail: site.contactEmail,
    ...(site.contactPhone && { contactPhone: site.contactPhone }),
  };
}

// Match `{{tokenName}}`.
const TOKEN_RE = /\{\{(\w+)\}\}/g;

/** Replace `{{token}}` placeholders in a single string. */
function replaceInString(
  value: string,
  tokens: Record<string, string>
): string {
  return value.replace(TOKEN_RE, (match, key: string) =>
    key in tokens ? tokens[key] : match
  );
}

/**
 * Recursively walk a parsed CMS object and expand every `{{token}}` found in
 * string values. Arrays and nested objects are traversed automatically.
 *
 * Non-string primitives (numbers, booleans, null) are passed through as-is.
 */
export function replaceTokens<T>(data: T): T {
  const tokens = getTokens();

  function walk(node: unknown): unknown {
    if (typeof node === "string") {
      return replaceInString(node, tokens);
    }
    if (Array.isArray(node)) {
      return node.map(walk);
    }
    if (node !== null && typeof node === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(node)) {
        out[k] = walk(v);
      }
      return out;
    }
    return node; // number, boolean, null, undefined
  }

  return walk(data) as T;
}
