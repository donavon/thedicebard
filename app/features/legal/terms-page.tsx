import termsMarkdown from "~/content/terms.md?raw";
import { renderMarkdown } from "~/utils/markdown";
import { PolicyPage } from "./components/policy-page";

const termsContentHtml = renderMarkdown(termsMarkdown, "app/content/terms.md");

export function TermsPage() {
  return <PolicyPage html={termsContentHtml} />;
}
