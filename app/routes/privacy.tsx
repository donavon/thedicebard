import PrivacyContent from "../content/privacy.mdx";
import { PolicyPage, policyMdxComponents } from "../components/policy-page";

export default function PrivacyRoute() {
  return (
    <PolicyPage>
      <PrivacyContent components={policyMdxComponents} />
    </PolicyPage>
  );
}
