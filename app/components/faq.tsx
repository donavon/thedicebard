import type { TownFaqItem } from "../data/towns";
import { ParchmentCard } from "./parchment-card";

type FaqProps = {
  title: string;
  items: TownFaqItem[];
};

export function Faq({ title, items }: FaqProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="faq"
      className="px-4 pb-24 pt-10 sm:px-6 lg:px-10 text-ink-blue"
    >
      <div className="pt-12">
        <ParchmentCard>
          <h2 className="flex items-center justify-center gap-3 text-balance text-center font-serif text-[clamp(1.5rem,3.1vw,2.1rem)] font-bold uppercase tracking-[0.1em] text-[#7A2D1E]">
            {title}
          </h2>
          <div className="mt-6 space-y-3 [&>details:first-of-type]:mt-6">
            {items.map((item) => (
              <details
                key={item.question}
                className="group rounded-[14px] border border-[#D2B58A] bg-[#F5E6CE] px-5 py-4 shadow-[0_1px_0_rgba(92,58,30,0.06)] [&_p]:mt-2 [&_strong]:font-semibold"
              >
                <summary className="cursor-pointer list-none font-serif text-[1.1rem] font-semibold uppercase tracking-[0.1em] text-[#6B2B1B] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
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
                <p className="text-[1.05rem] leading-relaxed text-ink-blue/95 max-w-prose">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </ParchmentCard>
      </div>
    </section>
  );
}
