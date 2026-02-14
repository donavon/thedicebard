import { Link, useLocation } from "react-router";
import rollickHeadshot from "../assets/images/rollick-headshot-web.webp";
import { getTownSlugFromPathname } from "../utils/town";

export function About() {
  const { pathname } = useLocation();
  const townSlug = getTownSlugFromPathname(pathname);

  return (
    <section
      id="about"
      className="py-24 px-4 bg-parchment text-ink-blue overflow-x-hidden md:overflow-x-visible"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-3/4 rounded-2xl bg-ink-blue/10 overflow-hidden relative shadow-xl transform rotate-2 group cursor-pointer hover:rotate-1 transition-transform duration-500">
              <img
                src={rollickHeadshot}
                alt="Rollick Carlberg West Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-dragon-red p-6 rounded-xl shadow-lg max-w-xs border border-dragon-red/40 transform -rotate-2 text-center">
              <p className="font-serif text-lg font-semibold text-parchment">
                "A safe, inclusive environment where every player feels
                welcomed."
              </p>
            </div>
          </div>

          <div className="mt-12 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-ink-blue text-balance">
              About the{" "}
              <span className="text-4xl md:text-5xl">Dungeon Master</span>
            </h2>

            <div className="prose prose-lg text-ink-blue font-sans leading-relaxed mb-8">
              <p className="mb-4">
                <span className="text-ink-blue font-medium">
                  Rollick Carlberg West
                </span>{" "}
                has 7 years of experience and a deep love for the game. He
                believe peer-to-peer connection is vital for kids. Having a
                "third space" that is neither school nor home is essential for
                growth.
              </p>
              <p className="mb-4">
                He provides a safe, inclusive environment where every
                player—including neurodivergent kids—feels welcomed and heroic.
                His table is a place where math meets magic, and shy kids become
                bold leaders.
              </p>
            </div>

            <div className="bg-ink-blue/5 p-8 rounded-2xl border-l-4 border-dragon-red">
              <h3 className="text-xl font-serif font-bold mb-2 text-ink-blue">
                The "Patron" Portal Promise
              </h3>
              <p className="text-ink-blue/70 mb-4">
                For parents, safety and education are paramount. All sessions
                are monitored, age-appropriate, and designed to foster social
                growth.
              </p>
              <div className="flex gap-4">
                <Link
                  to={`/${townSlug}/patrons`}
                  preventScrollReset
                  className="text-dragon-red font-bold hover:underline flex items-center gap-2"
                >
                  Read Parent Testimonials <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
