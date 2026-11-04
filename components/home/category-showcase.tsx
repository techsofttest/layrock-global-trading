"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import type { Category, Product } from "@/components/data/site-data";
import { ProductCard } from "@/components/ui/product-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface CategoryShowcaseProps {
  categories: Category[];
  products: Product[];
  onSelectCategory?: (category: string) => void;
}

interface CategoryRowProps {
  category: Category;
  categoryProducts: Product[];
  onSelectCategory?: (category: string) => void;
}

// Map category names to widescreen images in public/home-hero for mobile & tablet screens
const MOBILE_TAB_HERO_IMAGES: Record<string, string> = {
  "Aluminium Products & Extrusions": "/home-hero/Aluminium Products & Extrusions.png",
  "Non-ferrous metals": "/home-hero/Metal Products & Structural Steel.png",
  "Plastics (HDPE & Others)": "/home-hero/Plastics HDPE & Other Polymers.png",
  "AAC Blocks": "/home-hero/Autoclaved Aerated Concrete AAC Blocks.png",
  "Spices": "/home-hero/Premium Export Spices.png",
};

function CategoryRow({
  category,
  categoryProducts,
  onSelectCategory,
}: CategoryRowProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const mobileTabImage = MOBILE_TAB_HERO_IMAGES[category.name] || category.image;

  return (
    <div className="rounded-2xl bg-[#f4f5f7] p-2.5 sm:p-4">
      {/* Grid: Left Category Card (compact height) + Right Products Carousel */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-stretch">
        {/* Left: Compact Category banner with bg image & light white gradient from top-left */}
        <div className="relative min-h-[140px] overflow-hidden rounded-xl bg-[#171717] p-4 text-[#171717] sm:min-h-[160px] lg:col-span-3 lg:min-h-[220px] flex flex-col justify-start items-start shadow-xs">
          {/* Mobile and tablet view: Widescreen hero image from public/home-hero */}
          <div className="absolute inset-0 block lg:hidden">
            <Image
              src={mobileTabImage}
              alt={category.name}
              fill
              sizes="(max-width: 1024px) 100vw, 360px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Desktop view (lg+): Category portrait card image */}
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="360px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Light white gradient from top-left corner */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-start text-left">
            <h4 className="text-[15px] font-bold leading-tight tracking-tight text-[#171717] sm:text-[17px] lg:text-[18px]">
              {category.name}
            </h4>
            <a
              href="#products"
              onClick={() => onSelectCategory?.(category.name)}
              className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#171717] shadow-xs transition hover:bg-[#ff0000] hover:text-white sm:mt-2.5"
            >
              <span>View all</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Right: Products Carousel with reduced height & edge-hover navigation arrows */}
        <div className="group/carousel relative min-w-0 lg:col-span-9">
          {/* Left arrow on edge - appears on carousel hover */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={`Previous ${category.name} products`}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 hidden sm:flex size-10 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white/95 text-[#171717] shadow-lg opacity-0 pointer-events-none transition-all duration-200 group-hover/carousel:opacity-100 group-hover/carousel:pointer-events-auto hover:bg-[#ff0000] hover:text-white hover:scale-105 active:scale-95 sm:size-11"
          >
            <ArrowLeft size={19} />
          </button>

          {/* Right arrow on edge - appears on carousel hover */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={`Next ${category.name} products`}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 hidden sm:flex size-10 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white/95 text-[#171717] shadow-lg opacity-0 pointer-events-none transition-all duration-200 group-hover/carousel:opacity-100 group-hover/carousel:pointer-events-auto hover:bg-[#ff0000] hover:text-white hover:scale-105 active:scale-95 sm:size-11"
          >
            <ArrowRight size={19} />
          </button>

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={8}
            slidesPerView={2.05}
            breakpoints={{
              480: { slidesPerView: 2.2, spaceBetween: 10 },
              640: { slidesPerView: 2.5, spaceBetween: 12 },
              768: { slidesPerView: 2.5, spaceBetween: 14 },
              1024: { slidesPerView: 3, spaceBetween: 14 },
              1280: { slidesPerView: 3.5, spaceBetween: 14 },
            }}
            className="h-full"
          >
            {categoryProducts.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard product={product} className="h-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export function CategoryShowcase({
  categories,
  products,
  onSelectCategory,
}: CategoryShowcaseProps) {
  // Only the 5 main categories (skip "All products")
  const showcaseCategories = categories.filter((c) => c.name !== "All products");

  return (
    <section className="px-3.5 pb-6 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pb-8">
      <div className="mx-auto max-w-[1440px]">
        {/* Simple Section Header */}
        <ScrollReveal variant="fade-up" className="mb-4 sm:mb-6">
          <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#171717] sm:text-[26px] md:text-[32px]">
            Product Highlights by Category
          </h2>
        </ScrollReveal>

        {/* Category Rows */}
        <div className="space-y-4 sm:space-y-6">
          {showcaseCategories.map((category, index) => {
            const categoryProducts = products.filter(
              (p) => p.category === category.name
            );

            return (
              <ScrollReveal key={category.name} variant="fade-up" delayMs={index * 50}>
                <CategoryRow
                  category={category}
                  categoryProducts={categoryProducts}
                  onSelectCategory={onSelectCategory}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
