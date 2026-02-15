import privacyMarkdown from "~/content/privacy.md?raw";
import { renderMarkdown } from "~/utils/markdown";
import { PolicyPage } from "./components/policy-page";

const privacyContentHtml = renderMarkdown(
  privacyMarkdown,
  "app/content/privacy.md"
);

export function PrivacyPage() {
  return <PolicyPage html={privacyContentHtml} />;
}
