export function PatronPortal() {
  const testimonials = [
    {
      quote:
        "My son used to struggle with math, but now he's calculating hit probabilities in his head! The DM is fantastic.",
      author: "Sarah J., Parent of a 10-year-old Wizard",
    },
    {
      quote:
        "Safe, inclusive, and incredibly fun. It's the highlight of my daughter's week.",
      author: "Michael T., Dad of a Level 4 Rogue",
    },
    {
      quote:
        "Finally, an activity that gets them off video games and interacting with friends.",
      author: "Emily R., Mom of two",
    },
  ];

  return (
    <section id="patrons" className="py-20 px-4 bg-ink-blue text-parchment">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12 text-parchment">
          The Patron Portal
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-white/10 p-6 rounded-xl border border-parchment/20 italic"
            >
              <p className="mb-4 text-lg">"{t.quote}"</p>
              <p className="font-bold text-parchment not-italic">
                — {t.author}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-parchment text-ink-blue rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">
              Parent Resources
            </h3>
            <p className="max-w-xl opacity-80">
              Download consent forms, waivers, and our safety guidelines. We
              believe in transparency and partnership with parents.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="https://docs.google.com/document/d/1x9oYSltbpli36Omnq4wIpiqqEX1GJXHm0zYB3U0Viss/export?format=pdf"
              className="w-full max-w-[260px] px-6 py-3 text-center border-2 border-ink-blue rounded-lg font-bold hover:bg-ink-blue hover:text-parchment transition-colors sm:w-auto"
            >
              Safety Guide PDF
            </a>
            <a
              href="https://docs.google.com/document/d/1lw6fvb-L-pdvu-uNE5J9DFpejy0Qzv3kyHzuzLJI_Eg/export?format=pdf"
              className="w-full max-w-[260px] px-6 py-3 text-center border-2 border-ink-blue rounded-lg font-bold hover:bg-ink-blue hover:text-parchment transition-colors sm:w-auto"
            >
              Consent Form PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
