import { Outlet } from "react-router";
import { BlogFeedSubscribe } from "./components/blog-feed-subscribe";

export default function BlogLayout() {
  return (
    <section className="bg-parchment px-4 pb-24 pt-24 text-ink-blue">
      <div className="relative mx-auto w-full max-w-6xl">
        <BlogFeedSubscribe className="absolute right-0 top-0 z-10" />
        <Outlet />
      </div>
    </section>
  );
}
