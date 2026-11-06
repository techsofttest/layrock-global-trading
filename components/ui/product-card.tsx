import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CategoryProduct } from "@/lib/category";

export interface ProductCardProps {
  product: CategoryProduct;
  categoryName: string;
  className?: string;
}

export function ProductCard({
  product,
  categoryName,
  className = "",
}: ProductCardProps) {
  const productSlug = product.slug;
  const productHref = `/products/${product.cat_slug}/${productSlug}`;
  const enquiryHref = `/products/${product.cat_slug}/${productSlug}/enquiry`;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] ${className}`}
    >
      {/* Product Image */}
      <Link
        href={productHref}
        aria-label={`View full specifications for ${product.name}`}
        className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#f3f1ee]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        {/* Category Label */}
        <span className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 max-w-[calc(100%-20px)] truncate rounded-md bg-white/95 px-2.5 py-0.5 text-[11px] font-medium text-[#2d2d2d] shadow-xs sm:px-3 sm:py-1 sm:text-[12px]">
          {categoryName}
        </span>
      </Link>

      {/* Product Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link href={productHref} className="block">
          <h3 className="line-clamp-2 text-[13.5px] font-bold leading-snug tracking-[-0.02em] text-[#171717] transition hover:text-[#ff0000] sm:text-[15px]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 flex-1 line-clamp-2 text-[12px] leading-relaxed text-[#4a4a4a] sm:line-clamp-3 sm:text-[13px] sm:leading-5">
          {product.description?.replace(/<[^>]*>/g, "").trim()}
        </p>

        {/* Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 pt-1 sm:mt-4">
          <Link
            href={productHref}
            className="inline-flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-black/15 px-1.5 text-[11px] font-medium text-[#171717] transition hover:border-[#171717] hover:bg-[#171717] hover:text-white sm:h-9 sm:px-2 sm:text-[12px]"
          >
            <span>Details</span>
            <ArrowUpRight size={12} className="shrink-0 sm:size-[13px]" />
          </Link>

          <Link
            href={enquiryHref}
            className="inline-flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-[#ff0000] px-1.5 text-[11px] font-medium text-white transition hover:bg-[#d90000] sm:h-9 sm:px-2 sm:text-[12px]"
          >
            <span>Enquire</span>
            <ArrowRight size={12} className="shrink-0 sm:size-[13px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}
