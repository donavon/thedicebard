import type { ReactNode } from "react";
import FaqContent from "../content/faq.mdx";
import { ParchmentCard } from "./parchment-card";

export function Faq() {
  const mdxComponents = {
    h2: function FaqHeading({ children }: { children: ReactNode }) {
      return (
        <h2 className="flex items-center justify-center gap-3 text-balance text-center font-serif text-[clamp(1.5rem,3.1vw,2.1rem)] font-bold uppercase tracking-[0.1em] text-[#7A2D1E]">
          {children}
        </h2>
      );
    },
    FaqItem: function FaqItem({
      children,
      question,
    }: {
      children: ReactNode;
      question: string;
    }) {
      return (
        <details className="group rounded-[14px] border border-[#D2B58A] bg-[#F5E6CE] px-5 py-4 shadow-[0_1px_0_rgba(92,58,30,0.06)] [&_p]:mt-2 [&_strong]:font-semibold">
          <summary className="cursor-pointer list-none font-serif text-[1.1rem] font-semibold uppercase tracking-[0.1em] text-[#6B2B1B] marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              <span>{question}</span>
              <span className="flex h-6 w-6 items-center justify-center text-[#8A1E1A] transition-transform duration-200 group-open:rotate-45">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  className="h-6 w-6"
                >
                  <path
                    d="M12 6v12M6 12h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </summary>
          {children}
        </details>
      );
    },
    p: function FaqParagraph({ children }: { children: ReactNode }) {
      return (
        <p className="text-[1rem] leading-relaxed text-ink-blue/85">
          {children}
        </p>
      );
    },
    hr: function FaqDivider() {
      return null;
    },
    blockquote: function FaqCallout({ children }: { children: ReactNode }) {
      return (
        <div className="mt-6! border-l-4 border-[#8A1E1A] px-4 py-2 text-[1rem] italic text-ink-blue/85 [&_strong]:not-italic [&_strong]:text-[#8A1E1A]">
          {children}
        </div>
      );
    },
  };

  return (
    <section
      id="faq"
      className="px-4 pb-24 pt-10 sm:px-6 lg:px-10 text-ink-blue"
    >
      <div className="pt-12">
        <ParchmentCard>
          <div className="space-y-3 [&>details:first-of-type]:mt-6">
            <FaqContent components={mdxComponents} />
          </div>
        </ParchmentCard>
      </div>
    </section>
  );
}
