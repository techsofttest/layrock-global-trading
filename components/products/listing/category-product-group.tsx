"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Category, CategoryProduct } from "@/lib/category";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";

export interface CategoryProductGroupProps {
  category: Category;
  products: CategoryProduct[];
}

// 20 products per batch (4 rows in a 5-column grid)
const PRODUCTS_PER_BATCH = 20;

export function CategoryProductGroup({
  category,
  products,
}: CategoryProductGroupProps) {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_BATCH);

  // Dynamic category anchor
  const catAnchorId = `cat-${category.slug}`;

  // Dynamic banner image from Laravel API
  const bannerImage = category.banner_image || category.image;

  // Dynamic description from Laravel API
  const description = category.description || "";

  // Products displayed in current batch
  const displayedProducts = products.slice(0, visibleCount);

  const hasMore = visibleCount < products.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PRODUCTS_PER_BATCH);
  }

  return (
    <div
      id={catAnchorId}
      className="scroll-mt-28 border-b border-black/[0.06] bg-[#f4f5f7]"
    >
      {/* Dynamic Category Banner */}
      <div className="px-3.5 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative flex min-h-[180px] flex-col justify-center overflow-hidden rounded-xl bg-[#171717] px-4 py-6 text-white sm:min-h-[260px] sm:rounded-2xl sm:px-8 sm:py-10 md:min-h-[290px] md:px-10 md:py-12 lg:min-h-[320px] lg:px-14">
            {/* Category Banner Image */}
            {bannerImage && (
              <img
                src={bannerImage}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/95 via-[#171717]/75 to-[#171717]/40 sm:bg-gradient-to-r sm:from-[#171717]/95 sm:via-[#171717]/65 sm:to-transparent" />

            {/* Category Content */}
            <div className="relative z-10 max-w-xl text-left">
              <h2 className="text-[20px] font-bold leading-[1.14] tracking-[-0.03em] text-white sm:text-[28px] md:text-[34px] lg:text-[40px]">
                {category.name}
              </h2>

              {description && (
                <div
                  className="mt-2 text-[12.5px] leading-relaxed text-white/85 sm:mt-3 sm:text-[14px] md:text-[15px]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Category Products Grid */}
      <div className="px-3.5 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[1440px]">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={category.name}
                  />
                ))}
              </div>

              {/* Load More Products */}
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
                    View more {category.name} ({products.length - visibleCount}{" "}
                    remaining)
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
