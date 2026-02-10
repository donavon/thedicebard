declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { MDXComponents } from "@mdx-js/react";

  type MDXProps = {
    components?: MDXComponents;
  };

  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}
