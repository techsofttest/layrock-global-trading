"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Quote, User } from "lucide-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";

import { Eyebrow } from "@/components/ui/eyebrow";
import type { Testimonial } from "@/lib/testimonial";

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <section
      id="testimonials"
      className="scroll-mt-36 bg-[#f4f5f7] px-3.5 py-10 sm:px-6 sm:py-16 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Edge: Section Header & Descriptions */}
          <div className="lg:col-span-4 lg:pr-6">
            <Eyebrow textClassName="text-[11px] sm:text-xs">
              PARTNERSHIP MATTERS
            </Eyebrow>

            <h2 className="mt-2 text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#171717] sm:mt-3 sm:text-[28px] md:text-[32px]">
              Built on clear communication.
            </h2>

            <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#3f3f3f] sm:mt-4 sm:text-[15px] sm:leading-7">
              Good trade relationships start with clear expectations, reliable
              follow-up and an understanding of each order across global
              markets.
            </p>

            {/* Carousel External Navigation Controls */}
            <div className="mt-5 flex items-center gap-2 sm:mt-8">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous testimonials"
                className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white text-[#171717] shadow-xs transition hover:border-[#ff0000] hover:bg-[#ff0000] hover:text-white active:scale-95 sm:size-10"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next testimonials"
                className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white text-[#171717] shadow-xs transition hover:border-[#ff0000] hover:bg-[#ff0000] hover:text-white active:scale-95 sm:size-10"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Side: Continuous 2-Card Swiper Carousel */}
          <div className="min-w-0 lg:col-span-8">
            <Swiper
              modules={[Autoplay]}
              loop={testimonials.length > 1}
              speed={600}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={14}
              slidesPerView={1}
              breakpoints={{
                540: { slidesPerView: 1.3, spaceBetween: 16 },
                768: { slidesPerView: 1.6, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 22 },
              }}
              className="!pb-3"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="h-auto">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-7 lg:p-8">
                    <div>
                      {/* Top profile badge and decorative quote */}
                      <div className="flex items-center justify-between">
                        <div className="flex size-9 items-center justify-center rounded-full bg-[#fff0f0] text-[#ff0000] shadow-2xs sm:size-11">
                          <User
                            size={18}
                            className="sm:size-[21px]"
                            strokeWidth={2}
                          />
                        </div>

                        <Quote className="size-5 text-black/15 sm:size-6" />
                      </div>

                      {/* Testimonial Description */}
                      <blockquote className="mt-4 whitespace-pre-line text-[14px] font-medium leading-relaxed text-[#171717] sm:mt-6 sm:text-[18px] md:text-[20px] lg:text-[22px]">
                        &ldquo;{testimonial.description}&rdquo;
                      </blockquote>
                    </div>

                    {/* Author Details */}
                    <div className="mt-6 border-t border-black/[0.08] pt-4 sm:mt-8 sm:pt-5">
                      <p className="text-[13.5px] font-bold text-[#171717] sm:text-[14.5px]">
                        {testimonial.name}
                      </p>

                      <p className="mt-0.5 text-[12px] font-medium text-[#737373] sm:text-[13px]">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
