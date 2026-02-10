import type { ReactNode } from "react";
import { ParchmentCard } from "./parchment-card";

type PolicyPageProps = {
  children: ReactNode;
};

export function PolicyPage({ children }: PolicyPageProps) {
  return (
    <main className="bg-parchment px-4 pb-24 pt-28 text-ink-blue">
      <ParchmentCard>{children}</ParchmentCard>
    </main>
  );
}

export const policyMdxComponents = {
  h1: function PolicyTitle({ children }: { children: ReactNode }) {
    return (
      <h1 className="text-balance text-3xl font-serif font-bold text-ink-blue sm:text-4xl">
        {children}
      </h1>
    );
  },
  h2: function PolicyHeading({ children }: { children: ReactNode }) {
    return (
      <h2 className="mt-10 text-2xl font-serif font-bold text-[#7A2D1E]">
        {children}
      </h2>
    );
  },
  p: function PolicyParagraph({ children }: { children: ReactNode }) {
    return (
      <p className="mt-4 text-base leading-relaxed text-ink-blue/80">
        {children}
      </p>
    );
  },
  ul: function PolicyList({ children }: { children: ReactNode }) {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-blue/85">
        {children}
      </ul>
    );
  },
  li: function PolicyListItem({ children }: { children: ReactNode }) {
    return <li className="leading-relaxed">{children}</li>;
  },
  strong: function PolicyStrong({ children }: { children: ReactNode }) {
    return <strong className="font-semibold text-ink-blue">{children}</strong>;
  },
};
