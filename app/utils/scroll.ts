import type { MouseEvent } from "react";

type ScrollOptions = {
  behavior?: ScrollBehavior;
  offset?: number;
  onComplete?: () => void;
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

  const {
    behavior = "smooth",
    offset = getHeaderOffset(),
    onComplete,
  } = options;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const top = Math.max(0, targetTop - offset);

  window.scrollTo({ top, behavior });

  // If onComplete callback provided, detect when scroll ends
  if (onComplete) {
    const checkScrollEnd = () => {
      const currentScroll = window.scrollY;
      if (Math.abs(currentScroll - top) < 5) {
        onComplete();
      } else {
        requestAnimationFrame(checkScrollEnd);
      }
    };
    requestAnimationFrame(checkScrollEnd);
  }
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
    const select = document.querySelector<HTMLSelectElement>("#service");
    if (
      select &&
      Array.from(select.options).some(
        (option) =>
          option instanceof HTMLOptionElement && option.value === intent
      )
    ) {
      select.value = intent;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
}
