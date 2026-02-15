import { PolicyPage, policyMdxComponents } from "./components/policy-page";
import TermsContent from "~/content/terms.mdx";

export function TermsPage() {
  return (
    <PolicyPage>
      <TermsContent components={policyMdxComponents} />
    </PolicyPage>
  );
}
