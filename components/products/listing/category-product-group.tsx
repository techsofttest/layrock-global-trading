"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Category, Product } from "@/components/data/site-data";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";

export interface CategoryProductGroupProps {
  category: Category;
  products: Product[];
}

// Category-specific images mapped to public/home-hero/ folder
const CATEGORY_HERO_IMAGES: Record<string, string> = {
  "Aluminium Products & Extrusions":
    "/home-hero/Aluminium Products & Extrusions.png",
  "Non-ferrous metals":
    "/home-hero/Metal Products & Structural Steel.png",
  "Plastics (HDPE & Others)":
    "/home-hero/Plastics HDPE & Other Polymers.png",
  "AAC Blocks":
    "/home-hero/Autoclaved Aerated Concrete AAC Blocks.png",
  Spices:
    "/home-hero/Premium Export Spices.png",
};

// Category-specific descriptive subtitles
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Aluminium Products & Extrusions":
    "Explore premium architectural, commercial and industrial aluminium profiles, extrusions, and sheets.",
  "Non-ferrous metals":
    "Dependable non-ferrous metals and industrial sourcing for manufacturing, fabrication and infrastructure requirements.",
  "Plastics (HDPE & Others)":
    "High-density polyethylene and versatile polymer resins for manufacturing, blow moulding and packaging.",
  "AAC Blocks":
    "Lightweight, thermal-efficient autoclaved aerated concrete blocks for modern construction projects.",
  Spices:
    "Carefully sourced whole and ground aromatic spices for wholesale, commercial processing and export.",
};

// 4 rows in a 5-column grid = 20 products per batch
const PRODUCTS_PER_BATCH = 20;

export function CategoryProductGroup({
  category,
  products,
}: CategoryProductGroupProps) {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_BATCH);

  const catAnchorId = `cat-${category.name.toLowerCase().replace(/\s+/g, "-")}`;
  const bannerImage = CATEGORY_HERO_IMAGES[category.name] || category.image;
  const description =
    CATEGORY_DESCRIPTIONS[category.name] ||
    `Browse our selection of quality ${category.name.toLowerCase()} sourced for international commercial demand.`;

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PRODUCTS_PER_BATCH);
  }

  return (
    <div id={catAnchorId} className="scroll-mt-28 bg-[#f4f5f7] border-b border-black/[0.06]">
      {/* Boxed Banner Bar matching hero design */}
      <div className="px-3.5 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative min-h-[180px] overflow-hidden rounded-xl sm:rounded-2xl bg-[#171717] px-4 py-6 text-white shadow-md sm:min-h-[260px] sm:px-8 sm:py-10 md:min-h-[290px] md:px-10 md:py-12 lg:min-h-[320px] lg:px-14 flex flex-col justify-center">
            {/* Boxed Background Image from public/home-hero */}
            <Image
              src={bannerImage}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1440px) 100vw, 1440px"
              priority={false}
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Dark gradient overlay from left/bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/95 via-[#171717]/75 to-[#171717]/40 sm:bg-gradient-to-r sm:from-[#171717]/95 sm:via-[#171717]/65 sm:to-transparent" />

            {/* Content aligned to left */}
            <div className="relative z-10 max-w-xl text-left">
              <h2 className="text-[20px] font-bold leading-[1.14] tracking-[-0.03em] text-white sm:text-[28px] md:text-[34px] lg:text-[40px]">
                {category.name}
              </h2>

              <p className="mt-2 text-[12.5px] leading-relaxed text-white/85 sm:mt-3 sm:text-[14px] md:text-[15px]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Products directly below the boxed banner */}
      <div className="px-3.5 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[1440px]">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* View More Button (appears if products exceed visible batches of 4 rows) */}
              {hasMore && (
                <div className="mt-8 flex flex-col items-center justify-center sm:mt-12">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={handleLoadMore}
                    rightIcon={<ChevronDown size={16} />}
                    className="w-full max-w-xs justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#171717] transition hover:border-[#ff0000] hover:text-[#ff0000] sm:w-auto sm:max-w-none sm:px-8 sm:py-3 sm:text-sm"
                  >
                    View more {category.name} ({products.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center text-[#737373]">
              <p>No products available in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
