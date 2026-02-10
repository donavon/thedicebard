import TermsContent from "../content/terms.mdx";
import { PolicyPage, policyMdxComponents } from "../components/policy-page";

export default function TermsRoute() {
  return (
    <PolicyPage>
      <TermsContent components={policyMdxComponents} />
    </PolicyPage>
  );
}
