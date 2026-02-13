import type { ReactNode } from "react";
import { BlogCta } from "./blog-cta";

const blogMdxComponents = {
  h1: function BlogTitle({ children }: { children: ReactNode }) {
    return <h1 className="sr-only">{children}</h1>;
  },
  h2: function BlogHeading({ children }: { children: ReactNode }) {
    return (
      <h2 className="mt-10 text-3xl font-serif font-bold text-[#7A2D1E]">
        {children}
      </h2>
    );
  },
  h3: function BlogSubheading({ children }: { children: ReactNode }) {
    return (
      <h3 className="mt-8 text-2xl font-serif font-bold text-ink-blue">
        {children}
      </h3>
    );
  },
  p: function BlogParagraph({ children }: { children: ReactNode }) {
    return (
      <p className="mt-5 text-lg leading-relaxed text-ink-blue/85">
        {children}
      </p>
    );
  },
  ul: function BlogList({ children }: { children: ReactNode }) {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-blue/85">
        {children}
      </ul>
    );
  },
  ol: function BlogOrderedList({ children }: { children: ReactNode }) {
    return (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink-blue/85">
        {children}
      </ol>
    );
  },
  li: function BlogListItem({ children }: { children: ReactNode }) {
    return <li className="leading-relaxed">{children}</li>;
  },
  strong: function BlogStrong({ children }: { children: ReactNode }) {
    return <strong className="font-semibold text-ink-blue">{children}</strong>;
  },
  blockquote: function BlogQuote({ children }: { children: ReactNode }) {
    return (
      <blockquote className="mt-6 border-l-4 border-[#8A1E1A] px-4 text-ink-blue/80 italic">
        {children}
      </blockquote>
    );
  },
  BlogCta: function BlogCtaBlock() {
    return <BlogCta />;
  },
};

export { blogMdxComponents };
