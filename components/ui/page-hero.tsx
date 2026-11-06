import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export function PageHero({
  eyebrow = "WHO WE ARE",
  title,
  description,
  image = "/banner/b7.png",
  imageAlt = "Layrock Global Trading - International Freight & Logistics",
}: PageHeroProps) {
  return (
    <section className="w-full overflow-hidden bg-[#171717]">
      {/* ── Mobile: stacked layout (image above, content below) ── */}
      <div className="md:hidden">
        {/* Image at natural aspect ratio */}
        <div className="relative aspect-[2048/768] w-full">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Content card below the image */}
        <div className="bg-white px-4 py-6 sm:px-6 sm:py-8">
          {eyebrow && (
            <Eyebrow
              textClassName="text-[#171717]"
              slashClassName="text-[#ff0000]"
            >
              {eyebrow}
            </Eyebrow>
          )}

          <h1 className="mt-3 text-[24px] font-bold leading-[1.12] tracking-[-0.035em] text-[#171717] sm:text-[32px]">
            {title}
          </h1>

          <p className="mt-3 text-[14px] leading-relaxed text-[#4a4a4a] sm:text-[15px]">
            {description}
          </p>
        </div>
      </div>

      {/* ── Desktop: overlay layout (unchanged) ── */}
      <div className="relative hidden h-[70vh] min-h-[460px] md:block">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />

        {/* Inner Container aligning with site grid */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-4 sm:px-6 lg:px-10">
          {/* Left-aligned white box holding header and description */}
          <div className="w-full max-w-xl rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:p-10 text-left">
            {eyebrow && (
              <Eyebrow
                textClassName="text-[#171717]"
                slashClassName="text-[#ff0000]"
              >
                {eyebrow}
              </Eyebrow>
            )}

            <h1 className="mt-3 text-[32px] font-bold leading-[1.12] tracking-[-0.035em] text-[#171717] sm:text-[42px] lg:text-[48px]">
              {title}
            </h1>

            <p className="mt-3 text-[14px] leading-relaxed text-[#4a4a4a] sm:text-[15px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
