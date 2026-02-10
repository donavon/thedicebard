import dragonHero from "../../assets/hero/dragon2.webp";
import { cn } from "../../utils/cn";

type DragonProps = {
  className?: string;
};

export function Dragon({ className }: DragonProps) {
  return (
    <img
      src={dragonHero}
      alt=""
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
    />
  );
}
