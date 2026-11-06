import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/category";
import { CategoryCard } from "@/components/ui/category-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory?: (category: string) => void;
}

export function CategoriesSection({
  categories,
  onSelectCategory,
}: CategoriesSectionProps) {
  return (
    <section
      id="categories"
      className="scroll-mt-36 px-3.5 pb-4 sm:px-6 lg:px-10 lg:pb-6"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-9 sm:gap-4">
          <ScrollReveal variant="fade-up">
            <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#171717] sm:text-[26px] md:text-[32px]">
              Explore product categories
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-left">
            <a
              href="/products"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[13px] font-medium text-[#171717] transition hover:text-[#ff0000] sm:px-4 sm:py-2 sm:text-[14px]"
            >
              <span>View all products</span>
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1 sm:size-[17px]"
              />
            </a>
          </ScrollReveal>
        </div>

        {/* Mobile: Horizontal scrolling
            Desktop: Responsive category grid */}
        <div className="-mx-3.5 flex items-start gap-4 overflow-x-auto overflow-y-hidden px-3.5 pb-2 pt-1 touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-5 lg:gap-6">
          {categories.map((category, index) => {
            const categoryHref = `/products?category=${encodeURIComponent(
              category.slug,
            )}`;

            return (
              <ScrollReveal
                key={category.id}
                variant="fade-up"
                delayMs={index * 60}
                className="w-[124px] shrink-0 sm:w-auto sm:shrink"
              >
                <CategoryCard
                  category={category}
                  href={categoryHref}
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
