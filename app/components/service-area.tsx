import mapImage from "../assets/images/nj-map.webp";

type ServiceAreaProps = {
  copy?: string;
};

export function ServiceArea({ copy }: ServiceAreaProps) {
  const serviceCopy =
    copy ??
    "We serve families across New Jersey’s Essex and Passaic County, including Montclair, Glen Ridge, Bloomfield, Nutley, Verona, Cedar Grove, Clifton, and nearby towns.";

  return (
    <section className="overflow-x-hidden px-4 pb-24 pt-8 sm:px-6 lg:px-10 text-ink-blue">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex justify-center mb-6">
          <span className="h-1 w-24 bg-dragon-red/50 rounded-full"></span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12 text-dragon-red drop-shadow-sm">
          Service Area
        </h2>
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="mt-3 text-base leading-relaxed text-ink-blue/80">
              {serviceCopy}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-blue/85">
              <li>Essex County, NJ</li>
              <li>Passaic County, NJ</li>
              <li>Montclair, Glen Ridge, Bloomfield</li>
              <li>Nutley, Verona, Cedar Grove</li>
              <li>Clifton and surrounding towns</li>
            </ul>
          </div>

          <div className="relative">
            <div className="relative mx-auto w-[240px] sm:w-[280px] md:w-[320px] lg:max-w-md rotate-[-20deg]">
              <div className="overflow-hidden rounded-[22px] border border-[#B98C5A] bg-[#f7ead1] shadow-[0_14px_26px_rgba(92,58,30,0.25)]">
                <img
                  src={mapImage}
                  alt="Northern New Jersey service area map"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="relative flex h-36 w-36 items-center justify-center">
                  <span className="absolute h-36 w-36 rounded-full border-4 border-dragon-red/70" />
                  <span className="absolute h-20 w-20 rounded-full border-4 border-dragon-red/80" />
                  <span className="absolute h-3 w-3 rounded-full bg-dragon-red" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
