"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";

import type { Category, CategoryProduct } from "@/lib/category";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface ProductListingProps {
  categories: Category[];
  initialCategory?: string;
}

interface ProductWithCategory {
  product: CategoryProduct;
  category: Category;
}

export function ProductListing({
  categories,
  initialCategory = "All products",
}: ProductListingProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Listen to custom event so category cards anywhere can filter this section
  useEffect(() => {
    function handleCategoryEvent(event: Event) {
      const customEvent = event as CustomEvent<string>;

      if (customEvent.detail) {
        setActiveCategory(customEvent.detail);

        const section = document.getElementById("products");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }

    window.addEventListener("layrock:selectCategory", handleCategoryEvent);

    return () => {
      window.removeEventListener("layrock:selectCategory", handleCategoryEvent);
    };
  }, []);

  // Dynamically extract products from the category API
  const allProducts = useMemo<ProductWithCategory[]>(() => {
    return categories.flatMap((category) =>
      (category.products ?? []).map((product) => ({
        product,
        category,
      })),
    );
  }, [categories]);

  // Filter products based on the selected category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All products" || activeCategory === "all") {
      return allProducts;
    }

    return allProducts.filter(
      ({ category }) => category.name === activeCategory,
    );
  }, [activeCategory, allProducts]);

  // Maximum 15 products (3 rows x 5 columns on desktop)
  const INITIAL_LIMIT = 15;

  const displayedProducts = filteredProducts.slice(0, INITIAL_LIMIT);

  return (
    <section
      id="products"
      className="scroll-mt-36 bg-white px-3.5 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-10 lg:pb-24 lg:pt-10"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-3 sm:gap-6 sm:flex-row sm:items-end sm:justify-between">
          <ScrollReveal variant="fade-up">
            <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#171717] sm:text-[26px] md:text-[32px]">
              Products & Services
            </h2>
          </ScrollReveal>

          {/* Dynamic Category Dropdown */}
          <div className="flex items-center">
            <label className="inline-flex h-9 w-auto items-center gap-2 rounded-lg border border-black/15 bg-[#faf9f7] px-3 shadow-xs">
              <SlidersHorizontal
                size={14}
                className="shrink-0 text-[#404040]"
              />

              <select
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value)}
                aria-label="Filter products by category"
                className="cursor-pointer bg-transparent text-[12.5px] font-medium text-[#171717] outline-none sm:text-[13px]"
              >
                <option value="All products">All categories</option>

                {categories
                  .filter((category) => category.name !== "All products")
                  .map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </div>

        {/* Dynamic Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
              {displayedProducts.map(({ product, category }, index) => (
                <ScrollReveal
                  key={`${category.id}-${product.id}`}
                  variant="fade-up"
                  delayMs={(index % 5) * 50}
                >
                  <ProductCard product={product} categoryName={category.name} />
                </ScrollReveal>
              ))}
            </div>

            {/* View All Products */}
            <div className="mt-7 flex justify-center sm:mt-9">
              <Link
                href="/products"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-black/15 bg-white px-5 py-2.5 text-[13px] font-semibold text-[#171717] shadow-xs transition hover:border-[#ff0000] hover:bg-[#ff0000] hover:text-white sm:px-7 sm:py-3 sm:text-[14px]"
              >
                <span>View all products</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-black/10 bg-[#f8f9fa] px-4 py-10 text-center sm:px-6 sm:py-14">
            <Search className="mx-auto text-[#666666]" size={26} />

            <h3 className="mt-3 text-[16px] font-bold text-[#171717] sm:text-[18px]">
              No matching products found
            </h3>

            <p className="mt-1.5 text-[13px] text-[#4a4a4a] sm:text-[14px]">
              Try another keyword or select a different category.
            </p>

            <Button
              variant="secondary"
              size="md"
              onClick={() => setActiveCategory("All products")}
              className="mt-4 sm:mt-5"
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* ── Inspection Certificate CTA Card (Placed as full-width banner) ── */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-gradient-to-br from-[#faf9f7] via-[#f5f4f0] to-[#eae8e3] p-5 sm:p-8 lg:p-10 shadow-xs">
            <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              {/* Left: Icon + Text Content side-by-side */}
              <div className="flex items-start gap-4 sm:gap-6 max-w-3xl">
                <div className="relative size-14 shrink-0 sm:size-16 md:size-20">
                  <Image
                    src="/product-cta/3D Clipboard Inspection Icon.png"
                    alt="Inspection Certificate"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold leading-tight tracking-tight text-[#171717] sm:text-[22px] lg:text-[24px]">
                    Verified Pre-Shipment Inspection &amp; Mill Test
                    Certification
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[#4a4a4a] sm:text-[14px]">
                    All Layrock industrial materials, extrusions and metals
                    undergo rigorous certified lab testing, SGS/Bureau Veritas
                    inspections, and full compliance reporting before dispatch
                    to any port.
                  </p>
                </div>
              </div>

              {/* Right: CTA Button */}
              <Button
                as="a"
                href="/contact"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight size={15} />}
                className="rounded-xl shadow-xs shrink-0"
              >
                Request Inspection Specs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
