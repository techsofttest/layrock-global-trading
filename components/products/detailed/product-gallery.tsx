"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Main Image Carousel (Horizontal, draggable & swipe-friendly)
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  // Desktop Vertical Thumbnails Carousel
  const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Sync state on main carousel slide change
  const onSelect = useCallback(() => {
    if (!mainEmblaApi) return;
    const index = mainEmblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    if (thumbEmblaApi) {
      thumbEmblaApi.scrollTo(index);
    }
  }, [mainEmblaApi, thumbEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) return;
    mainEmblaApi.on("select", onSelect);
    mainEmblaApi.on("reInit", onSelect);
    return () => {
      mainEmblaApi.off("select", onSelect);
      mainEmblaApi.off("reInit", onSelect);
    };
  }, [mainEmblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!mainEmblaApi) return;
      mainEmblaApi.scrollTo(index);
    },
    [mainEmblaApi],
  );

  const scrollPrev = useCallback(() => {
    if (mainEmblaApi) mainEmblaApi.scrollPrev();
  }, [mainEmblaApi]);

  const scrollNext = useCallback(() => {
    if (mainEmblaApi) mainEmblaApi.scrollNext();
  }, [mainEmblaApi]);

  const scrollThumbPrev = useCallback(() => {
    if (thumbEmblaApi) thumbEmblaApi.scrollPrev();
  }, [thumbEmblaApi]);

  const scrollThumbNext = useCallback(() => {
    if (thumbEmblaApi) thumbEmblaApi.scrollNext();
  }, [thumbEmblaApi]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-4">
      {/* ── Desktop View: Vertical Thumbnails to the left of the main image ── */}
      {images.length > 1 && (
        <div className="relative hidden lg:flex flex-col items-center shrink-0 w-[92px]">
          {/* Scroll Up Button for thumbnails */}
          {images.length > 4 && (
            <button
              type="button"
              onClick={scrollThumbPrev}
              aria-label="Previous thumbnails"
              className="mb-1 flex size-7 items-center justify-center rounded-md border border-black/10 bg-white text-[#171717] shadow-xs transition hover:bg-[#ff0000] hover:text-white cursor-pointer"
            >
              <ChevronUp size={16} />
            </button>
          )}

          {/* Draggable Vertical Embla Carousel for thumbnails */}
          <div
            className="h-[360px] xl:h-[420px] w-full overflow-hidden"
            ref={thumbEmblaRef}
          >
            <div className="flex flex-col gap-2.5">
              {images.map((img, idx) => {
                const isActive = selectedIndex === idx;
                return (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => scrollTo(idx)}
                    className={`relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border-2 transition cursor-pointer select-none ${
                      isActive
                        ? "border-[#ff0000] ring-2 ring-[#ff0000]/20 opacity-100"
                        : "border-black/10 hover:border-black/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover pointer-events-none"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scroll Down Button for thumbnails */}
          {images.length > 4 && (
            <button
              type="button"
              onClick={scrollThumbNext}
              aria-label="Next thumbnails"
              className="mt-1 flex size-7 items-center justify-center rounded-md border border-black/10 bg-white text-[#171717] shadow-xs transition hover:bg-[#ff0000] hover:text-white cursor-pointer"
            >
              <ChevronDown size={16} />
            </button>
          )}
        </div>
      )}

      {/* ── Main Image Stage ── */}
      <div className="min-w-0 flex-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#f4f5f7] sm:aspect-[16/11]">
          {/* Embla Main Viewport */}
          <div
            className="size-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
            ref={mainEmblaRef}
          >
            <div className="flex h-full touch-pan-y">
              {images.map((img, idx) => (
                <div
                  key={img + idx}
                  className="relative size-full min-w-0 flex-[0_0_100%]"
                >
                  <img
                    src={img}
                    alt={`${productName} - image ${idx + 1}`}
                    className="h-full w-full object-cover pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Left arrow button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous product image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex size-9 items-center justify-center rounded-lg bg-white/90 text-[#171717] shadow-md backdrop-blur-sm transition hover:bg-[#ff0000] hover:text-white sm:size-10 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Right arrow button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next product image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex size-9 items-center justify-center rounded-lg bg-white/90 text-[#171717] shadow-md backdrop-blur-sm transition hover:bg-[#ff0000] hover:text-white sm:size-10 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Counter Pill */}
          <span className="absolute bottom-3 right-3 z-10 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm pointer-events-none">
            {selectedIndex + 1}/{images.length}
          </span>
        </div>

        {/* ── Mobile / Tablet View: Horizontal Thumbnails below main image ── */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin] sm:pb-1 lg:hidden">
            {images.map((img, idx) => {
              const isActive = selectedIndex === idx;
              return (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => scrollTo(idx)}
                  className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 transition cursor-pointer sm:size-24 ${
                    isActive
                      ? "border-[#ff0000] ring-2 ring-[#ff0000]/20 opacity-100"
                      : "border-black/10 hover:border-black/30 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
