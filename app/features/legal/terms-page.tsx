import termsMarkdown from "~/content/terms.md?raw";
import { resolveRawText } from "~/utils/markdown";
import { PolicyPage } from "./components/policy-page";

const termsContent = resolveRawText(termsMarkdown, "app/content/terms.md");

export function TermsPage() {
  return <PolicyPage markdown={termsContent} />;
}
