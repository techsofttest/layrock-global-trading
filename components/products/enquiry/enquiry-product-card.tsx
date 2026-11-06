import Image from "next/image";
import { FileText, MapPin, Package } from "lucide-react";
import type { ProductEnquiry } from "@/lib/product";
import { Eyebrow } from "@/components/ui/eyebrow";

export interface EnquiryProductCardProps {
  product: ProductEnquiry;
}

export function EnquiryProductCard({ product }: EnquiryProductCardProps) {
  const specs = product.specification;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition">
      {/* Mobile View */}
      <div className="flex items-center gap-3 p-3.5 sm:hidden sm:gap-3.5 sm:p-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-black/5 bg-[#f6f6f6] min-[380px]:size-16">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Eyebrow textClassName="text-[10px] min-[380px]:text-[11px] font-semibold">
            {product.category.name ?? ""}
          </Eyebrow>

          <h2 className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug tracking-tight text-[#171717] min-[380px]:text-[16px] sm:text-[17px]">
            {product.name}
          </h2>
        </div>
      </div>

      {/* Desktop & Tablet View */}
      <div className="relative hidden aspect-[4/3] w-full overflow-hidden bg-[#f6f6f6] sm:block">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Product Meta & Details */}
      <div className="px-3.5 pb-4 pt-1 sm:p-6">
        {/* Title & Category on desktop */}
        <div className="hidden sm:block">
          <Eyebrow textClassName="text-[11px] font-semibold lg:text-[12px]">
            {product.category.name ?? ""}
          </Eyebrow>

          <h2 className="mt-2 text-[20px] font-bold leading-tight tracking-tight text-[#171717] lg:text-[22px]">
            {product.name}
          </h2>
        </div>

        <p className="mt-1 text-[11.5px] leading-relaxed text-[#555] sm:mt-2 sm:text-[12.5px] lg:text-[13px]">
          {product.description}
        </p>

        {/* Product Specifications */}
        <div className="mt-3.5 grid grid-cols-3 gap-2 border-t border-black/[0.08] pt-3 text-[11px] sm:mt-6 sm:flex sm:flex-col sm:space-y-3.5 sm:gap-0 sm:pt-5 sm:text-[12px] lg:text-[12.5px]">
          {/* Specification */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-2.5">
            <div className="flex items-center gap-1.5 text-[#ff0000] sm:mt-0.5 sm:shrink-0">
              <FileText size={14} className="sm:size-[15px]" />
              <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#737373] min-[380px]:text-[10px] sm:hidden">
                Spec
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <span className="hidden text-[10.5px] font-bold uppercase tracking-wider text-[#737373] sm:block">
                Specification
              </span>

              <p className="mt-0.5 break-words font-medium text-[#171717] sm:mt-0">
                {specs.Spec}
              </p>
            </div>
          </div>

          {/* Origin */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-2.5">
            <div className="flex items-center gap-1.5 text-[#ff0000] sm:mt-0.5 sm:shrink-0">
              <MapPin size={14} className="sm:size-[15px]" />
              <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#737373] min-[380px]:text-[10px] sm:hidden">
                Origin
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <span className="hidden text-[10.5px] font-bold uppercase tracking-wider text-[#737373] sm:block">
                Origin
              </span>

              <p className="mt-0.5 break-words font-medium text-[#171717] sm:mt-0">
                {specs.Origin}
              </p>
            </div>
          </div>

          {/* Packing */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-2.5">
            <div className="flex items-center gap-1.5 text-[#ff0000] sm:mt-0.5 sm:shrink-0">
              <Package size={14} className="sm:size-[15px]" />
              <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#737373] min-[380px]:text-[10px] sm:hidden">
                Packing
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <span className="hidden text-[10.5px] font-bold uppercase tracking-wider text-[#737373] sm:block">
                Packing
              </span>

              <p className="mt-0.5 break-words font-medium text-[#171717] sm:mt-0">
                {specs.Packing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
