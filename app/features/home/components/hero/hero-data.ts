import buttonWaxRed from "~/assets/hero/wax-button-large-cropped.webp";
import buttonBronze from "~/assets/hero/bronze-button-large-cropped.webp";

export type HeroButtonConfig = {
  label: string;
  section: string;
  image: string;
};

export const heroButtons: HeroButtonConfig[] = [
  { label: "Book Your Quest", section: "booking", image: buttonWaxRed },
  {
    label: "Explore Services",
    section: "services",
    image: buttonBronze,
  },
];
