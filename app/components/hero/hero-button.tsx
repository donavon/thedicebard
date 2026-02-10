import { Link, useLocation } from "react-router";
import { cn } from "../../utils/cn";
import { getTownSlugFromPathname } from "../../utils/town";

const baseClass =
  "relative inline-flex items-center justify-center text-white font-serif font-medium uppercase tracking-[0.03em]";

const desktopClass =
  "w-[190px] h-[50px] sm:w-[230px] sm:h-[68px] md:w-[200px] md:h-[56px] lg:w-[250px] lg:h-[78px] text-[0.85rem] sm:text-base md:text-[0.95rem] lg:text-lg transition-transform duration-200 hover:-translate-y-1";

const mobileClass = "w-[190px] h-[58px] text-[0.88rem]";

type HeroButtonProps = {
  label: string;
  section: string;
  image: string;
  variant: "desktop" | "mobile";
  className?: string;
};

export function HeroButton({
  label,
  section,
  image,
  variant,
  className,
}: HeroButtonProps) {
  const variantClass = variant === "desktop" ? desktopClass : mobileClass;
  const { pathname } = useLocation();
  const townSlug = getTownSlugFromPathname(pathname);

  return (
    <Link
      to={`/${townSlug}/${section}`}
      preventScrollReset
      className={cn(baseClass, variantClass, className)}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-fill"
        aria-hidden="true"
      />
      <span className="relative drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] font-bold font-stretch-90% -translate-y-0.5">
        {label}
      </span>
    </Link>
  );
}
