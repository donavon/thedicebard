import type { ReactNode } from "react";

type Benefit = {
  title: ReactNode;
  desc: string;
};

export function InfoSection() {
  const benefits: Benefit[] = [
    {
      title: (
        <>
          Probability
          <br />
          &amp; Math
        </>
      ),
      desc: "Calculate odds, manage resources, and apply critical thinking.",
    },
    {
      title: (
        <>
          Improv
          <br />
          &amp; Performance
        </>
      ),
      desc: "Build confidence, act in character, and think on your feet.",
    },
    {
      title: (
        <>
          Social-Emotional
          <br />
          Learning
        </>
      ),
      desc: "Navigate complex social dynamics and practice empathy.",
    },
    {
      title: (
        <>
          Collaborative
          <br />
          Storytelling
        </>
      ),
      desc: "Work together to weave a narrative where every voice matters.",
    },
  ];

  return (
    <section
      id="what-is-dnd"
      className="relative z-0 py-20 px-4 bg-parchment text-ink-blue -mt-20"
    >
      <div className="max-w-6xl mx-auto relative">
        <div className="flex justify-center mb-8">
          <span className="h-1 w-24 bg-dragon-red/50 rounded-full"></span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12 text-dragon-red drop-shadow-sm">
          What is Dungeons & Dragons?
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg text-ink-blue/80 font-sans leading-relaxed">
            <p className="mb-6">
              Dungeons & Dragons (also known as D&amp;D) is a fantasy
              role-playing game where you and your friends assume the role of a
              party of adventurers. You can play a warrior wielding a battleaxe
              or a wizard with powerful spells.
            </p>
            <p className="font-medium text-xl text-ink-blue italic mb-6">
              "It’s more than a game—it’s a masterclass in probability, math,
              improv, and social-emotional learning."
            </p>
            <p>
              It is a communal activity where you, your friends, and the Dungeon
              Master decide where the story goes. Together, you'll solve
              puzzles, battle monsters, and create memories that last a
              lifetime.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-ink-blue/10 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-serif font-bold mb-3 text-dragon-red leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-blue/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
