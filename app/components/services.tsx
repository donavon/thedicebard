import { Link, useLocation } from "react-router";
import { getTownSlugFromPathname } from "../utils/town";

export function Services() {
  const { pathname } = useLocation();
  const townSlug = getTownSlugFromPathname(pathname);

  const services = [
    {
      title: "Weekly Ongoing Campaigns",
      price: "Start your Legend",
      desc: "A long-running story for you and 5 friends. Design your characters, play weekly, and grow the campaign together over time.",
      cta: "Start your Campaign",
      highlight: false,
      intent: "weekly",
    },
    {
      title: "One-Offs & Parties",
      price: "Epic in a Day",
      desc: "A quick D&D one-shot to elevate a birthday or event. Choose from 13 crafted pre-built characters and tackle an epic story wrapped up in a single day.",
      cta: "Book a Party",
      highlight: true,
      intent: "party",
    },
    {
      title: "Classes & Workshops",
      price: "Learn to Play",
      desc: "'How to Play' sessions that teach the mechanics of the game, probability math, and acting skills for beginners. Perfect for new adventurers.",
      cta: "Enroll Now",
      highlight: false,
      intent: "workshop",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-4 bg-ink-blue text-parchment relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <svg
          width="400"
          height="400"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FDF6E3"
            d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.8,32.4C59.4,43.3,47.9,52.2,35.6,58.7C23.3,65.2,10.2,69.3,-1.7,72.2C-13.6,75.1,-25.9,76.8,-37.1,72.2C-48.3,67.6,-58.4,56.7,-66.6,44.5C-74.8,32.3,-81.1,18.8,-82.1,4.9C-83.1,-9,-78.8,-23.3,-70.5,-35.3C-62.2,-47.3,-49.9,-57,-36.8,-64.7C-23.7,-72.4,-9.8,-78.1,4.4,-85.8L18.7,-93.4"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-parchment">
            The Adventure Menu
          </h2>
          <p className="text-xl text-parchment/70 max-w-2xl mx-auto">
            Choose how you want to experience the magic of Dungeons & Dragons.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.intent}
              className={`relative p-8 rounded-2xl transition-all duration-300 flex flex-col ${
                service.highlight
                  ? "bg-dragon-red text-parchment shadow-2xl scale-105 border-2 border-parchment/20"
                  : "bg-ink-blue/50 border border-parchment/10 text-parchment hover:bg-ink-blue/70"
              }`}
            >
              {service.highlight && (
                <div className="absolute top-0 right-0 bg-parchment text-dragon-red text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-serif font-bold mb-2">
                {service.title}
              </h3>
              <div className="text-sm uppercase tracking-wider opacity-80 mb-6 font-semibold">
                {service.price}
              </div>
              <p className="mb-8 flex-grow opacity-90 leading-relaxed text-sm md:text-base">
                {service.desc}
              </p>
              <Link
                to={`/${townSlug}/booking?intent=${service.intent}`}
                preventScrollReset
                className={`w-full py-3 px-6 rounded-lg text-center font-bold transition-colors ${
                  service.highlight
                    ? "bg-parchment text-dragon-red hover:bg-white"
                    : "bg-dragon-red/20 text-parchment hover:bg-dragon-red border border-dragon-red/50"
                }`}
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
