"use client";

import type { Category } from "@/lib/category";
import { CategoryCard } from "@/components/ui/category-card";

export interface ProductsCategoryNavProps {
  categories: Category[];
  selectedCategory?: string | null;
  onSelectCategory?: (categoryName: string) => void;
}

export function ProductsCategoryNav({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProductsCategoryNavProps) {
  return (
    <section className="border-b border-black/[0.06] bg-white px-3.5 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-6 lg:px-10 lg:pt-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="pt-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#737373]">
              Categories
            </span>

            {selectedCategory && onSelectCategory && (
              <button
                type="button"
                onClick={() => onSelectCategory("all")}
                className="rounded-full bg-black/5 px-3 py-1 text-[11.5px] font-bold text-[#171717] transition hover:bg-[#ff0000] hover:text-white cursor-pointer"
              >
                Show All Categories
              </button>
            )}
          </div>

          {/* Mobile: Horizontal scrollable row
              Desktop: Responsive category grid */}
          <div className="-mx-3.5 flex items-start gap-3.5 overflow-x-auto overflow-y-hidden px-3.5 pb-3 pt-1 touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-5">
            {categories.map((category) => {
              const isSelected =
                selectedCategory === category.slug ||
                selectedCategory === category.name;

              return (
                <div
                  key={category.id}
                  className={`flex w-[142px] shrink-0 items-center justify-center rounded-2xl p-2.5 transition-all duration-300 min-[400px]:w-[150px] sm:w-auto sm:shrink sm:py-3 sm:px-2 ${
                    isSelected
                      ? "bg-[#ff0000]/5 ring-2 ring-[#ff0000]"
                      : "hover:bg-black/[0.02]"
                  }`}
                >
                  <CategoryCard
                    category={category}
                    onSelectCategory={onSelectCategory}
                    className="w-full cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
