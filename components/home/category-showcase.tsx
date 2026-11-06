"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowRight as ArrowIcon,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";

import type { Category as ApiCategory, CategoryProduct } from "@/lib/category";
import type { Product } from "@/components/data/site-data";

import { ProductCard } from "@/components/ui/product-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface CategoryShowcaseProps {
  categories: ApiCategory[];
  onSelectCategory?: (category: string) => void;
}

interface CategoryRowProps {
  category: ApiCategory;
  onSelectCategory?: (category: string) => void;
}

// Mobile & tablet category images
const MOBILE_TAB_HERO_IMAGES: Record<string, string> = {
  "Aluminium Products & Extrusions":
    "/home-hero/Aluminium Products & Extrusions.png",
  "Non-ferrous metals": "/home-hero/Metal Products & Structural Steel.png",
  "Plastics (HDPE & Others)": "/home-hero/Plastics HDPE & Other Polymers.png",
  "AAC Blocks": "/home-hero/Autoclaved Aerated Concrete AAC Blocks.png",
  Spices: "/home-hero/Premium Export Spices.png",
};

// Adapt API product data to the existing ProductCard component
function mapApiProduct(
  product: CategoryProduct,
  category: ApiCategory,
): Product {
  return {
    ...product,
    category: category.name,
    categorySlug: category.slug,
  } as unknown as Product;
}

function CategoryRow({ category, onSelectCategory }: CategoryRowProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const mobileTabImage =
    MOBILE_TAB_HERO_IMAGES[category.name] || category.image;

  const categoryProducts = category.products ?? [];

  return (
    <div className="rounded-2xl bg-[#f4f5f7] p-2.5 sm:p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-stretch">
        {/* Left: Category card */}
        <div className="relative flex min-h-[140px] flex-col items-start justify-start overflow-hidden rounded-xl bg-white p-4 text-[#171717] sm:min-h-[160px] lg:col-span-3 lg:min-h-[220px]">
          {/* Mobile and tablet image */}
          <div className="absolute inset-0 block lg:hidden">
            <img
              src={mobileTabImage}
              alt={category.name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Desktop category image */}
          <div className="absolute inset-0 hidden lg:block">
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/85 via-white/45 to-transparent" />

          {/* Category content */}
          <div className="relative z-10 flex flex-col items-start text-left">
            <h4 className="text-[15px] font-bold leading-tight tracking-tight text-[#171717] sm:text-[17px] lg:text-[18px]">
              {category.name}
            </h4>

            <Link
              href={`/category/${category.slug}`}
              onClick={() => onSelectCategory?.(category.name)}
              className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#171717] transition hover:bg-[#ff0000] hover:text-white sm:mt-2.5"
            >
              <span>View all</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right: Product carousel */}
        <div className="group/carousel relative min-w-0 lg:col-span-9">
          {/* Previous button */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={`Previous ${category.name} products`}
            className="absolute left-2 top-1/2 z-20 hidden size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white text-[#171717] opacity-0 shadow-lg transition-all duration-200 group-hover/carousel:pointer-events-auto group-hover/carousel:opacity-100 hover:bg-[#ff0000] hover:text-white sm:flex sm:size-11"
          >
            <ArrowLeft size={19} />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={`Next ${category.name} products`}
            className="absolute right-2 top-1/2 z-20 hidden size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white text-[#171717] opacity-0 shadow-lg transition-all duration-200 group-hover/carousel:pointer-events-auto group-hover/carousel:opacity-100 hover:bg-[#ff0000] hover:text-white sm:flex sm:size-11"
          >
            <ArrowRight size={19} />
          </button>

          {categoryProducts.length > 0 ? (
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
                  <ProductCard
                    product={product}
                    categoryName={category.name}
                    className="h-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-xl bg-white text-sm text-gray-500">
              No products available in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CategoryShowcase({
  categories,
  onSelectCategory,
}: CategoryShowcaseProps) {
  // Exclude "All products"
  const showcaseCategories = categories.filter(
    (category) => category.name !== "All products",
  );

  if (showcaseCategories.length === 0) {
    return null;
  }

  return (
    <section className="px-3.5 pb-6 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pb-8">
      <div className="mx-auto max-w-[1440px]">
        {/* Section heading */}
        <ScrollReveal variant="fade-up" className="mb-4 sm:mb-6">
          <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#171717] sm:text-[26px] md:text-[32px]">
            Product Highlights by Category
          </h2>
        </ScrollReveal>

        {/* Dynamic category rows */}
        <div className="space-y-4 sm:space-y-6">
          {showcaseCategories.map((category, index) => (
            <ScrollReveal
              key={category.id}
              variant="fade-up"
              delayMs={index * 50}
            >
              <CategoryRow
                category={category}
                onSelectCategory={onSelectCategory}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
