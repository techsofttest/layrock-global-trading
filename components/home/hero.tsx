"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import type { Category } from "@/lib/category";
import { Button } from "@/components/ui/button";
import "swiper/css";

export interface HeroProps {
  slides: Category[];
}

export function Hero({ slides }: HeroProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  if (!slides.length) {
    return null;
  }

  return (
    <section id="home" className="px-3 pt-3 sm:px-6 sm:pt-5 lg:px-10 lg:pt-7">
      <div className="relative mx-auto max-w-[1440px]">
        <Swiper
          modules={[Autoplay, A11y]}
          autoplay={
            slides.length > 1
              ? { delay: 6000, disableOnInteraction: false }
              : false
          }
          loop={slides.length > 1}
          speed={650}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
          className="hero-swiper min-h-[310px] rounded-2xl shadow-md sm:h-[330px] lg:h-[360px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="overflow-hidden rounded-2xl">
              <div className="relative flex min-h-[310px] flex-col justify-center overflow-hidden rounded-2xl bg-[#333333] sm:h-full">
                <img
                  src={slide.banner_image}
                  alt={slide.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/95 via-[#171717]/65 to-transparent sm:via-[#171717]/45" />

                <div className="relative z-10 flex h-full flex-col justify-center px-4.5 py-6 pb-16 text-white sm:px-10 sm:py-6 sm:pb-6 lg:px-14">
                  <h1 className="max-w-[700px] whitespace-pre-line text-[21px] leading-[1.18] tracking-[-0.035em] sm:text-[30px] md:text-[34px] lg:text-[40px]">
                    {slide.name}
                  </h1>

                  <p className="mt-2 max-w-[460px] text-[12.5px] leading-relaxed text-white/85 sm:mt-2.5 sm:text-[14px]">
                    {slide.description?.replace(/<[^>]*>/g, "").trim()}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
                    <Button
                      as="a"
                      href="#products"
                      variant="primary"
                      size="sm"
                      rightIcon={<ArrowRight size={14} />}
                    >
                      Explore products
                    </Button>

                    <Button
                      as="a"
                      href="#contact"
                      variant="tertiary"
                      size="sm"
                      rightIcon={<ArrowUpRight size={14} />}
                    >
                      Request an enquiry
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider controls */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 sm:bottom-6 sm:right-6 sm:gap-2">
            <span className="mr-2 text-[12px] tabular-nums text-white sm:mr-3 sm:text-[13px]">
              <span className="text-white">
                {String(slideIndex + 1).padStart(2, "0")}
              </span>

              <span className="mx-1.5 text-white/50 sm:mx-2">/</span>

              {String(slides.length).padStart(2, "0")}
            </span>

            <Button
              variant="dark"
              size="icon"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="size-8 sm:size-9"
            >
              <ArrowLeft size={16} />
            </Button>

            <Button
              variant="dark"
              size="icon"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="size-8 sm:size-9"
            >
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
