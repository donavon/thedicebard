import type { ComponentPropsWithoutRef } from "react";
import type { SectionId } from "~/data/sections";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /**
   * Section ID for scroll-to-section navigation.
   * Must be one of the valid section IDs defined in ~/data/sections.ts
   */
  sectionId: SectionId;
};

/**
 * Type-safe section component that ensures section IDs match
 * the routing configuration.
 */
export function Section({ sectionId, children, ...props }: SectionProps) {
  return (
    <section id={sectionId} {...props}>
      {children}
    </section>
  );
}
