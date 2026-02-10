import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type ParchmentCardProps = {
  children: ReactNode;
  className?: string;
};

export function ParchmentCard({ children, className }: ParchmentCardProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl rounded-[28px] border border-[#C9A476]",
        "bg-[#F3E2C6] px-6 py-10 shadow-[0_18px_30px_rgba(92,58,30,0.25)] sm:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}
