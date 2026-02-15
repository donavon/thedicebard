import { micromark } from "micromark";

export function resolveRawText(value: unknown, sourcePath: string) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && value !== null) {
    if ("default" in value && typeof value.default === "string") {
      return value.default;
    }

    throw new Error(
      `Invalid raw import from ${sourcePath}. The module did not expose a string payload.`
    );
  }

  throw new Error(
    `Invalid raw import from ${sourcePath}. Expected string, received '${typeof value}'.`
  );
}

export function renderMarkdown(source: unknown, sourcePath: string) {
  return micromark(resolveRawText(source, sourcePath));
}
