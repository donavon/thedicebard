import type { MouseEvent } from "react";

type ScrollOptions = {
  behavior?: ScrollBehavior;
  offset?: number;
};

function getHeaderOffset() {
  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  return headerHeight;
}

export function scrollToSection(id: string, options: ScrollOptions = {}) {
  const target = id ? document.getElementById(id) : document.body;
  if (!target) {
    return;
  }

  const { behavior = "smooth", offset = getHeaderOffset() } = options;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const top = Math.max(0, targetTop - offset);

  window.scrollTo({ top, behavior });
}

export function handleHashLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) {
    return;
  }

  event.preventDefault();

  const id = href.slice(1);
  scrollToSection(id, { behavior: "smooth" });
  window.history.pushState(null, "", href);

  const intent = event.currentTarget.getAttribute("data-booking-intent");
  if (intent && id === "booking") {
    const select = target.querySelector<HTMLSelectElement>("#service");
    if (
      select &&
      Array.from(select.options).some((option) => option.value === intent)
    ) {
      select.value = intent;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
}
