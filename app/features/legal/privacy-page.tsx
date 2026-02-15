import { PolicyPage, policyMdxComponents } from "./components/policy-page";
import PrivacyContent from "~/content/privacy.mdx";

export function PrivacyPage() {
  return (
    <PolicyPage>
      <PrivacyContent components={policyMdxComponents} />
    </PolicyPage>
  );
}
