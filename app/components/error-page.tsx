import { Link } from "react-router";
import errorImage from "~/assets/images/500.webp";

type ErrorPageProps = {
  message: string;
  details: string;
  stack?: string;
};

export function ErrorPage({
  message: _message,
  details: _details,
  stack,
}: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center px-4 pt-32 pb-12 min-h-[calc(100vh-200px)]">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8">
          <img
            src={errorImage}
            alt="Wild magic surge illustration"
            className="w-full max-w-100 h-auto rounded-3xl shadow-2xl"
            width={400}
            height={400}
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dragon-red mb-6 drop-shadow-sm">
          A Wild Magic Surge has Occurred!
        </h1>

        <p className="text-lg md:text-xl text-ink-blue/80 leading-relaxed mb-8 px-4">
          We tried to cast Render Page, but the Weave twisted. Our lead Wizard
          has accidentally turned the server into a potted plant. We're
          currently waiting for the effect to wear off.
        </p>

        {stack && (
          <details className="mb-8 text-left">
            <summary className="cursor-pointer text-ink-blue font-serif font-bold mb-4 hover:text-dragon-red transition-colors">
              View Error Details
            </summary>
            <pre className="w-full p-4 overflow-x-auto bg-ink-blue/5 rounded-lg text-sm text-ink-blue/80 border border-ink-blue/10">
              <code>{stack}</code>
            </pre>
          </details>
        )}

        <Link
          to="/home"
          className="inline-block bg-dragon-red hover:bg-dragon-red/90 text-white font-serif font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-balance"
        >
          Dispel Magic
        </Link>
      </div>
    </div>
  );
}
