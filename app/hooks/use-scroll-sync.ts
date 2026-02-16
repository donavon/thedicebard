import { useEffect, useMemo, useRef, useState } from "react";

type UseScrollSyncOptions = {
  sectionIds: readonly string[];
  townSlug: string;
  enabled?: boolean;
  debounceMs?: number;
};

function getHeaderOffset() {
  const header = document.querySelector("header");
  return header?.getBoundingClientRect().height ?? 0;
}

export function useScrollSync({
  sectionIds,
  townSlug,
  enabled = true,
  debounceMs = 150,
}: UseScrollSyncOptions) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isProgrammaticScroll = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Include "home" section for hero tracking (memoized to prevent re-renders)
  const allSectionIds = useMemo(() => ["home", ...sectionIds], [sectionIds]);

  // Listen for programmatic scroll events
  useEffect(() => {
    function handleScrollStart() {
      isProgrammaticScroll.current = true;
    }

    function handleScrollEnd() {
      // Re-enable after a delay to ensure scroll has settled
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }

    window.addEventListener("programmatic-scroll-start", handleScrollStart);
    window.addEventListener("programmatic-scroll-end", handleScrollEnd);

    return () => {
      window.removeEventListener(
        "programmatic-scroll-start",
        handleScrollStart
      );
      window.removeEventListener("programmatic-scroll-end", handleScrollEnd);
    };
  }, []);

  // Update URL when active section changes
  useEffect(() => {
    if (!enabled || !activeSection || isProgrammaticScroll.current) {
      return;
    }

    // Clear any pending debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce URL updates
    debounceTimer.current = setTimeout(() => {
      // Use window.location.pathname instead of React Router's location
      // because replaceState doesn't update React Router's location
      const currentPath = window.location.pathname;

      // Map "home" section to root path, others to section paths
      const targetPath =
        activeSection === "home"
          ? `/${townSlug}`
          : `/${townSlug}/${activeSection}`;

      // Only update if URL doesn't already match
      if (currentPath !== targetPath) {
        // Use history.replaceState to update URL without triggering navigation
        window.history.replaceState(null, "", targetPath);
      }
    }, debounceMs);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [activeSection, enabled, townSlug, debounceMs]);

  // Set up Intersection Observer
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const headerHeight = getHeaderOffset();
    const visibilityMap = new Map<string, number>();

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${headerHeight}px 0px -50% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
    };

    function handleIntersection(entries: IntersectionObserverEntry[]) {
      // Update visibility map
      for (const entry of entries) {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          visibilityMap.set(sectionId, entry.intersectionRatio);
        } else {
          visibilityMap.delete(sectionId);
        }
      }

      // Find section with highest visibility, prioritizing "home" when tied or close
      let maxRatio = 0;
      let mostVisibleSection: string | null = null;

      for (const [sectionId, ratio] of visibilityMap.entries()) {
        // Prioritize "home" section by giving it a slight boost
        const adjustedRatio = sectionId === "home" ? ratio * 1.1 : ratio;
        if (adjustedRatio > maxRatio) {
          maxRatio = ratio; // Store original ratio
          mostVisibleSection = sectionId;
        }
      }

      // Update active section if we have a clear winner (threshold > 0.25)
      if (mostVisibleSection && maxRatio > 0.25) {
        setActiveSection(mostVisibleSection);
      }
    }

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Observe all section elements (including home)
    for (const sectionId of allSectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current.observe(element);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, allSectionIds]);
}
