import privacyMarkdown from "~/content/privacy.md?raw";
import { resolveRawText } from "~/utils/markdown";
import { PolicyPage } from "./components/policy-page";

const privacyContent = resolveRawText(
  privacyMarkdown,
  "app/content/privacy.md"
);

export function PrivacyPage() {
  return <PolicyPage markdown={privacyContent} />;
}
