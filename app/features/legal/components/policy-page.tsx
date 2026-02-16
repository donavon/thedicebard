import type { ReactNode } from "react";
import { ParchmentCard } from "~/components/parchment-card";
import ReactMarkdown from "react-markdown";

type PolicyPageProps = {
  children?: ReactNode;
  markdown?: string;
};

const policyContentClassName =
  "[&_h1]:text-balance [&_h1]:text-3xl [&_h1]:font-serif [&_h1]:font-bold [&_h1]:text-ink-blue [&_h1]:sm:text-4xl [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-[#7A2D1E] [&_p]:mt-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-ink-blue/80 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-ink-blue/85 [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-ink-blue [&_a]:underline [&_a]:decoration-ink-blue/40 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-dragon-red";

export function PolicyPage({ children, markdown }: PolicyPageProps) {
  return (
    <main className="bg-parchment px-4 pb-24 pt-28 text-ink-blue">
      <ParchmentCard>
        {markdown ? (
          <article className={policyContentClassName}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </article>
        ) : (
          children
        )}
      </ParchmentCard>
    </main>
  );
}
