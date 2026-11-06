"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProductFloatingCtaProps {
  name: string;
  category: string;
  image: string;
  enquiryHref: string;
}

export function ProductFloatingCta({
  name,
  category,
  image,
  enquiryHref,
}: ProductFloatingCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside
      aria-label="Floating product enquiry bar"
      className={`fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-[620px] -translate-x-1/2 transition-all duration-300 ease-out sm:bottom-6 sm:w-[calc(100%-2rem)] ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-2.5 rounded-2xl border border-black/10 bg-white/95 p-2 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.22)] backdrop-blur-md sm:gap-4 sm:p-3">
        {/* Product Image & Title */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-black/5 bg-[#f6f6f6] sm:size-14">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <span className="block truncate text-[11px] font-medium text-[#171717]/80 sm:text-sm">
              {category}
            </span>
            <h3 className="truncate text-[12.5px] font-bold text-[#171717] sm:text-[15px]">
              {name}
            </h3>
          </div>
        </div>

        {/* CTA Enquire Now Button */}
        <div className="shrink-0">
          <Button
            as="a"
            href={enquiryHref}
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight size={14} className="sm:size-[15px]" />}
            className="rounded-xl px-3.5 py-2 text-[12px] font-bold uppercase tracking-wider shadow-sm sm:px-5 sm:py-2.5 sm:text-[13px]"
          >
            <span className="hidden xs:inline">Enquire Now</span>
            <span className="xs:hidden">Enquire</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
