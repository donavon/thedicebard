import { Section } from "~/components/section";
import type { InfoContent } from "~/content/loader.server";

type InfoSectionProps = {
  content: InfoContent;
};

export function InfoSection({ content }: InfoSectionProps) {
  const { title, introParagraph1, introQuote, introParagraph2, benefits } =
    content;

  return (
    <Section
      sectionId="what-is-dnd"
      className="relative z-0 py-20 px-4 bg-parchment text-ink-blue -mt-20"
    >
      <div className="max-w-6xl mx-auto relative">
        <div className="flex justify-center mb-8">
          <span className="h-1 w-24 bg-dragon-red/50 rounded-full"></span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12 text-dragon-red drop-shadow-sm">
          {title}
        </h2>

        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] items-center">
          <div className="prose prose-lg text-ink-blue/80 font-sans leading-relaxed">
            <p className="mb-6">{introParagraph1}</p>
            {introQuote && (
              <p className="font-medium text-xl text-ink-blue italic mb-6">
                "{introQuote}"
              </p>
            )}
            {introParagraph2 && <p>{introParagraph2}</p>}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="bg-white/50 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-ink-blue/10 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-base sm:text-lg font-serif font-bold mb-3 text-dragon-red leading-tight whitespace-nowrap">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-blue/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
