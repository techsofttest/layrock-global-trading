"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Category } from "@/lib/category";
import { ProductsCategoryNav } from "@/components/products/listing/products-category-nav";
import { CategoryProductGroup } from "@/components/products/listing/category-product-group";

export interface ProductsCatalogContainerProps {
  categories: Category[];
  initialCategory?: string;
}

export function ProductsCatalogContainer({
  categories,
  initialCategory,
}: ProductsCatalogContainerProps) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    urlCategory || initialCategory || null,
  );

  // Synchronize selected category with URL changes
  useEffect(() => {
    setSelectedCategory(urlCategory || initialCategory || null);
  }, [urlCategory, initialCategory]);

  // Filter categories dynamically using API data
  const filteredCategories = useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") {
      return categories;
    }

    return categories.filter(
      (category) =>
        category.slug === selectedCategory ||
        category.name === selectedCategory,
    );
  }, [selectedCategory, categories]);

  // Handle category selection
  const handleSelectCategory = (categorySlug: string) => {
    const nextCategory =
      categorySlug === "all" || selectedCategory === categorySlug
        ? null
        : categorySlug;

    setSelectedCategory(nextCategory);

    const nextUrl = nextCategory
      ? `/products?category=${encodeURIComponent(nextCategory)}`
      : "/products";

    window.history.pushState(null, "", nextUrl);
  };

  return (
    <>
      {/* Dynamic Category Navigation */}
      <ProductsCategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Dynamic Category Sections with Nested Products */}
      <div className="space-y-0">
        {filteredCategories.map((category) => (
          <CategoryProductGroup
            key={category.id}
            category={category}
            products={category.products || []}
          />
        ))}
      </div>
    </>
  );
}
