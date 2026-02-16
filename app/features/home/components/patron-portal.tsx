import { Section } from "~/components/section";
import type { PatronsContent } from "~/content/loader.server";

type PatronPortalProps = {
  content: PatronsContent;
};

export function PatronPortal({ content }: PatronPortalProps) {
  const {
    title,
    testimonials,
    resourcesTitle,
    resourcesDesc,
    safetyGuideLabel,
    safetyGuideUrl,
    consentFormLabel,
    consentFormUrl,
  } = content;

  return (
    <Section
      sectionId="patrons"
      className="py-20 px-4 bg-ink-blue text-parchment"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12">
          {title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-white/10 p-6 rounded-xl border border-parchment/20"
            >
              <p className="mb-4 text-lg italic">"{t.quote}"</p>
              <p className="font-bold">— {t.author}</p>
            </div>
          ))}
        </div>

        <div className="bg-parchment text-ink-blue rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">
              {resourcesTitle}
            </h3>
            <p className="max-w-xl opacity-80">{resourcesDesc}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href={safetyGuideUrl}
              className="w-full max-w-65 px-6 py-3 text-center border-2 border-ink-blue rounded-lg font-bold hover:bg-ink-blue hover:text-parchment transition-colors sm:w-auto"
            >
              {safetyGuideLabel}
            </a>
            <a
              href={consentFormUrl}
              className="w-full max-w-65 px-6 py-3 text-center border-2 border-ink-blue rounded-lg font-bold hover:bg-ink-blue hover:text-parchment transition-colors sm:w-auto"
            >
              {consentFormLabel}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
