"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CategoryProduct } from "@/lib/category";

export type SearchProduct = CategoryProduct & {
  categoryName: string;
};

export interface SearchDropdownProps {
  isOpen: boolean;
  query: string;
  results: SearchProduct[];
  onSelectProduct: () => void;
  onViewAllResults: () => void;
}

export function SearchDropdown({
  isOpen,
  query,
  results,
  onSelectProduct,
  onViewAllResults,
}: SearchDropdownProps) {
  if (!isOpen || !query.trim()) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
      <div className="max-h-80 overflow-y-auto py-1.5 [scrollbar-width:thin] [scrollbar-color:#d4d4d4_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d4d4d4] hover:[&::-webkit-scrollbar-thumb]:bg-[#a3a3a3] [&::-webkit-scrollbar-track]:bg-transparent">
        {results.length > 0 ? (
          <div>
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.cat_slug}/${product.slug}`}
                onClick={onSelectProduct}
                className="group flex items-center gap-2.5 px-4 py-2 transition hover:bg-black/[0.03]"
              >
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-red-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[13.5px] font-medium text-[#171717] transition-colors group-hover:text-red-600">
                    {product.name}
                  </h4>

                  <p className="truncate text-[11px] text-[#737373]">
                    {product.categoryName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-4 py-5 text-center text-[13px] text-[#737373]">
            No products found matching &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
