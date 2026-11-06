import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ProductEnquiry } from "@/lib/product";

export interface EnquiryBreadcrumbProps {
  product: ProductEnquiry;
}

export function EnquiryBreadcrumb({ product }: EnquiryBreadcrumbProps) {
  const productUrl = `/products/${product.category.slug}/${product.slug}`;

  return (
    <div className="border-b border-black/[0.06] bg-white px-4 py-3.5 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-3 text-[11.5px] font-medium text-[#737373] sm:text-[12.5px]">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="transition hover:text-[#ff0000]">
            Home
          </Link>

          <span className="text-[#a3a3a3]">/</span>

          <Link href="/products" className="transition hover:text-[#ff0000]">
            Products
          </Link>

          <span className="text-[#a3a3a3]">/</span>

          <Link
            href={`/products/${product.category.slug}`}
            className="transition hover:text-[#ff0000]"
          >
            {product.category.name}
          </Link>

          <span className="text-[#a3a3a3]">/</span>

          <Link
            href={productUrl}
            className="font-bold text-[#171717] hover:text-[#ff0000]"
          >
            {product.name}
          </Link>

          <span className="text-[#a3a3a3]">/</span>

          <span className="font-semibold text-[#ff0000]">Enquiry</span>
        </div>

        <Link
          href={productUrl}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#171717] transition hover:text-[#ff0000]"
        >
          <ArrowLeft size={14} />
          <span>Back to Product Details</span>
        </Link>
      </div>
    </div>
  );
}
