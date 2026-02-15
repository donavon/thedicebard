import { cn } from "~/utils/cn";

type BlogFeedSubscribeProps = {
  className?: string;
};

export function BlogFeedSubscribe({ className }: BlogFeedSubscribeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-sm font-medium text-ink-blue/70",
        className
      )}
    >
      <span>Subscribe:</span>
      <a
        className="text-dragon-red hover:underline"
        href="/rss.xml"
        rel="noopener noreferrer"
        target="_blank"
      >
        RSS
      </a>
      <a
        className="text-dragon-red hover:underline"
        href="/atom.xml"
        rel="noopener noreferrer"
        target="_blank"
      >
        Atom
      </a>
    </p>
  );
}
