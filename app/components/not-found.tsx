import { Link } from "react-router";
import notFoundImage from "~/assets/404/404.webp";

export function NotFound() {
  return (
    <div className="flex items-center justify-center px-4 pt-32 pb-12 min-h-[calc(100vh-200px)]">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8">
          <img
            src={notFoundImage}
            alt="Mimic chest monster"
            className="w-full max-w-100 h-auto rounded-3xl shadow-2xl"
            width={400}
            height={400}
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dragon-red mb-6 drop-shadow-sm">
          Roll for Initiative!
        </h1>

        <p className="text-lg md:text-xl text-ink-blue/80 leading-relaxed mb-8 px-4">
          That wasn't a URL... it was a Mimic! It has devoured the page you were
          looking for. Don't worry, we've distracted it with some shiny gold
          coins while you make your escape.
        </p>

        <Link
          to="/home"
          className="inline-block bg-dragon-red hover:bg-dragon-red/90 text-white font-serif font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-balance"
        >
          Disengage and Retreat to Safety
        </Link>
      </div>
    </div>
  );
}
